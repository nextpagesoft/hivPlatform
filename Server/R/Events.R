CreateDownload <- function(type, format, output, appMgr) {
  switch(type,
    'APP_MANAGER' = {
      data <- appMgr
      fileNamePrefix <- 'HIVPlatform_State'
      outputControlName <- 'downState'
    },
    'ADJUSTED_DATA' = {
      data <- appMgr$CaseMgr$LastAdjustmentResult$Data
      fileNamePrefix <- 'AdjustedData'
      outputControlName <- sprintf('downAdjData%s', toupper(format))
    },
    'REP_DEL_DATA' = {
      data <- appMgr$CaseMgr$LastAdjustmentResult$Artifacts$RdDistribution
      fileNamePrefix <- 'RepDelayData'
      outputControlName <- sprintf('downRepDelData%s', toupper(format))
    },
    'HIV_MAIN_FIT_DETAILED' = {
      data <- appMgr$HIVModelMgr$MainFitResult
      fileNamePrefix <- 'HIVModelMainFitDetailed'
      outputControlName <- sprintf('downMainFitDetailed%s', toupper(format))
    },
    'HIV_MAIN_FIT' = {
      data <- rbindlist(lapply(names(appMgr$HIVModelMgr$MainFitResult), function(iter) {
        dt <- appMgr$HIVModelMgr$MainFitResult[[iter]]$Results$MainOutputs
        dt[, ':='(
          Imputation = iter,
          Run = NULL
        )]
        setcolorder(dt, 'Imputation')
      }))
      fileNamePrefix <- 'HIVModelMainFit'
      outputControlName <- sprintf('downMainFit%s', toupper(format))
    },
    'HIV_MAIN_FIT_EXCEL' = {
      data <- appMgr$HIVModelMgr$PlotData
      fileNamePrefix <- 'HIVModel_Charts'
      outputControlName <- sprintf('downFit%s', toupper(format))
      if (toupper(format) == 'XLSM') {
        template <- GetSystemFile('templates', 'Charts.xlsm')
      } else {
        template <- GetSystemFile('templates', 'Charts_withoutMacro.xlsx')
      }
    },
    'HIV_MAIN_FIT_EXCEL_NO_MACRO' = {
      data <- appMgr$HIVModelMgr$PlotData
      fileNamePrefix <- 'HIVModel_Charts'
      outputControlName <- sprintf('downFit%s', toupper(format))
    },
    'HIV_BOOT_FIT_DETAILED' = {
      data <- appMgr$HIVModelMgr$BootstrapFitResult
      fileNamePrefix <- 'HIVModelBootFitDetailed'
      outputControlName <- sprintf('downBootFitDetailed%s', toupper(format))
    },
    'HIV_BOOT_FIT' = {
      data <- Filter(
        function(item) item$Results$Converged,
        Reduce(c, appMgr$HIVModelMgr$BootstrapFitResult)
      )
      data <- rbindlist(lapply(data, function(res) {
        mainOutputs <- res$Results$MainOutputs
        mainOutputs[, ':='(
          DataSet = res$DataSet,
          BootIteration = res$BootIteration
        )]
        return(mainOutputs)
      }))
      setcolorder(
        data,
        c('DataSet', 'BootIteration')
      )
      fileNamePrefix <- 'HIVModelBootFit'
      outputControlName <- sprintf('downBootFit%s', toupper(format))
    },
    'HIV_BOOT_STAT_DETAILED' = {
      data <- appMgr$HIVModelMgr$BootstrapFitStats
      fileNamePrefix <- 'HIVModelBootStatDetailed'
      outputControlName <- sprintf('downBootStatDetailed%s', toupper(format))
    },
    'HIV_BOOT_STAT' = {
      data <- rbindlist(appMgr$HIVModelMgr$BootstrapFitStats$MainOutputsStats)
      fileNamePrefix <- 'HIVModelBootStat'
      outputControlName <- sprintf('downBootStat%s', toupper(format))
    },
    'MAIN_REPORT' = {
      data <- appMgr$ReportArtifacts
      fileNamePrefix <- 'AdjustmentsReport'
      outputControlName <- sprintf('report%s', toupper(format))
    }
  )

  output[[outputControlName]] <- downloadHandler(
    filename = function() {
      timeStamp <- GetTimeStamp()
      switch(type,
        'APP_MANAGER' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'ADJUSTED_DATA' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'REP_DEL_DATA' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'HIV_MAIN_FIT_DETAILED' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'HIV_MAIN_FIT' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'HIV_MAIN_FIT_EXCEL' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'HIV_BOOT_FIT_DETAILED' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'HIV_BOOT_FIT' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'HIV_BOOT_STAT_DETAILED' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'HIV_BOOT_STAT' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, format)
        },
        'MAIN_REPORT' = {
          sprintf('%s_%s.%s', fileNamePrefix, timeStamp, switch(
            format,
            'html' = 'html',
            'pdf' = 'pdf',
            'latex' = 'zip',
            'word' = 'docx'
          ))
        }
      )
    },
    content = function(file) {
      switch(type,
        'APP_MANAGER' = {
          WriteDataFile(data, file)
        },
        'ADJUSTED_DATA' = {
          WriteDataFile(data, file)
        },
        'REP_DEL_DATA' = {
          WriteDataFile(data, file)
        },
        'HIV_MAIN_FIT_DETAILED' = {
          WriteDataFile(data, file)
        },
        'HIV_MAIN_FIT' = {
          WriteDataFile(data, file)
        },
        'HIV_MAIN_FIT_EXCEL' = {
          WriteExcelFile(data, file, 'DATA', template)
        },
        'HIV_BOOT_FIT_DETAILED' = {
          WriteDataFile(data, file)
        },
        'HIV_BOOT_FIT' = {
          WriteDataFile(data, file)
        },
        'HIV_BOOT_STAT_DETAILED' = {
          WriteDataFile(data, file)
        },
        'HIV_BOOT_STAT' = {
          WriteDataFile(data, file)
        },
        'MAIN_REPORT' = {
          RenderReportToFile(
            reportFilePath = GetReportFileNames()['Main Report'],
            format = sprintf('%s_document', format),
            params = data,
            outputFilePath = file
          )
        }
      )
    }
  )
}

Events <- function(
  input,
  output,
  session,
  appMgr
) {
  observers <- list()

  observers[[length(observers) + 1]] <- observeEvent(input$saveStateBtn, {
    appMgr$SetUIState(input$saveStateBtn)
    appMgr$SaveState()
  })

  observers[[length(observers) + 1]] <- observeEvent(input$loadStateBtn, {
    appMgr$SuspendObservers()
    fileInfo <- input$loadStateBtn
    appMgr$LoadState(
      fileInfo$datapath,
      fileInfo$name[1]
    )
  })

  observeEvent(input$loadingUIStateDone, {
    status <- input$loadingUIStateDone
    appMgr$SendMessage(
      'UI_STATE_LOADED',
      list(
        ActionStatus = 'SUCCESS',
        ActionMessage = 'State has been set correctly'
      )
    )
    # appMgr$ResumeObservers()
  })

  observeEvent(input$test, {
    appMgr$ResumeObservers()
  })

  observers[[length(observers) + 1]] <- observeEvent(input$cancelBootstrapBtn, {
    appMgr$HIVModelMgr$CancelBootstrapFit()
  })

  # Case-based data upload event
  observers[[length(observers) + 1]] <- observeEvent(input$caseUploadBtn, {
    fileInfo <- input$caseUploadBtn
    appMgr$SendMessage(
      'CASE_BASED_DATA_UPLOADED',
      list(
        ActionStatus = 'SUCCESS',
        ActionMessage = 'Data has been uploaded successfully',
        FileName = fileInfo$name[1],
        FileSize = fileInfo$size[1],
        FileType = fileInfo$type[1],
        FilePath = fileInfo$datapath[1]
      )
    )
    appMgr$CaseMgr$ReadData(
      fileInfo$datapath,
      fileInfo$name[1]
    )
  })

  observers[[length(observers) + 1]] <- observeEvent(input$unloadCaseBasedData, {
    appMgr$CaseMgr$UnloadData()
  })

  observers[[length(observers) + 1]] <- observeEvent(input$aggrUploadBtn, {
    fileInfo <- input$aggrUploadBtn
    appMgr$SendMessage(
      'AGGR_DATA_UPLOADED',
      list(
        ActionStatus = 'SUCCESS',
        ActionMessage = 'Data has been uploaded successfully',
        FileName = fileInfo$name[1],
        FileSize = fileInfo$size[1],
        FileType = fileInfo$type[1],
        FilePath = fileInfo$datapath[1]
      )
    )
    appMgr$AggrMgr$ReadData(fileInfo$datapath[1], fileInfo$name[1])
  })

  observers[[length(observers) + 1]] <- observeEvent(input$attrMapping, {
    appMgr$CaseMgr$ApplyAttributesMapping(input$attrMapping)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$groupingPresetSelect, {
    preset <- input$groupingPresetSelect
    distr <- appMgr$CaseMgr$OriginDistribution
    originGrouping <- GetOriginGroupingPreset(preset, distr)

    appMgr$SendMessage(
      type = 'CASE_BASED_DATA_ORIGIN_GROUPING_PREPARED',
      payload = list(
        ActionStatus = 'SUCCESS',
        ActionMessage = 'Origin grouping has been prepared',
        OriginGroupingPreset = preset,
        OriginGrouping = originGrouping
      )
    )
  })

  observers[[length(observers) + 1]] <- observeEvent(input$originGrouping, {
    appMgr$CaseMgr$ApplyOriginGrouping(input$originGrouping)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$checkOriginGrouping, {
    migrantCompatible <- CheckOriginGroupingForMigrant(input$checkOriginGrouping)

    appMgr$SendMessage(
      type = 'CASE_BASED_DATA_ORIGIN_GROUPING_MIGRANT_CHECKED',
      payload = list(
        ActionStatus = migrantCompatible$Valid,
        ActionMessage = migrantCompatible$Message
      )
    )
  })

  observers[[length(observers) + 1]] <- observeEvent(input$summaryFilters, {
    filters <- input$summaryFilters
    if (!(all(sapply(filters$DiagYear, is.null)) || all(sapply(filters$NotifQuarter, is.null)))) {
      appMgr$CaseMgr$SetFilters(input$summaryFilters)
    }
  }, ignoreInit = TRUE)

  observers[[length(observers) + 1]] <- observeEvent(input$runAdjustBtn, {
    params <- input$runAdjustBtn
    adjustmentSpecs <- GetAdjustmentSpecsWithParams(params)
    appMgr$CaseMgr$RunAdjustments(adjustmentSpecs)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$cancelAdjustBtn, {
    appMgr$CaseMgr$CancelAdjustments()
  })

  observers[[length(observers) + 1]] <- observeEvent(appMgr$CaseMgr$AdjustmentTask$HTMLRunLog, {
    appMgr$SendMessage(
      'ADJUSTMENTS_RUN_LOG_SET',
      payload = list(
        ActionStatus = 'SUCCESS',
        RunLog = appMgr$CaseMgr$AdjustmentTask$HTMLRunLog
      )
    )
  })

  observers[[length(observers) + 1]] <- observeEvent(input$runMigrantBtn, {
    appMgr$CaseMgr$RunMigration()
  })

  observers[[length(observers) + 1]] <- observeEvent(input$cancelMigrantBtn, {
    appMgr$CaseMgr$CancelMigration()
  })

  observers[[length(observers) + 1]] <- observeEvent(appMgr$CaseMgr$MigrationTask$HTMLRunLog, {
    appMgr$SendMessage(
      'MIGRATION_RUN_LOG_SET',
      payload = list(
        ActionStatus = 'SUCCESS',
        RunLog = appMgr$CaseMgr$MigrationTask$HTMLRunLog
      )
    )
  })

  observers[[length(observers) + 1]] <- observeEvent(input$migrConnFlag, {
    appMgr$HIVModelMgr$SetMigrConnFlag(input$migrConnFlag)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$migrRegion, {
    appMgr$CaseMgr$SetMigrationRegion(input$migrRegion)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$propTableStrat, {
    appMgr$CaseMgr$SetMigrationPropStrat(input$propTableStrat)
  }, ignoreNULL = FALSE)

  observers[[length(observers) + 1]] <- observeEvent(input$aggrFilters, {
      appMgr$HIVModelMgr$SetAggrFilters(input$aggrFilters)
    },
    ignoreInit = TRUE
  )

  observers[[length(observers) + 1]] <- observeEvent(appMgr$CaseMgr$LastAdjustmentResult, {
    CreateDownload('ADJUSTED_DATA', 'csv', output, appMgr)
    CreateDownload('ADJUSTED_DATA', 'rds', output, appMgr)
    CreateDownload('ADJUSTED_DATA', 'dta', output, appMgr)
  })

  observers[[length(observers) + 1]] <- observeEvent(
    appMgr$CaseMgr$LastAdjustmentResult$Artifacts$RdDistribution, {
    CreateDownload('REP_DEL_DATA', 'csv', output, appMgr)
    CreateDownload('REP_DEL_DATA', 'rds', output, appMgr)
    CreateDownload('REP_DEL_DATA', 'dta', output, appMgr)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$createReportBtn, {
    reportSpec <- input$createReportBtn
    appMgr$CreateReport(reportSpec)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$cancelCreatingReportBtn, {
    appMgr$CancelReport()
  })

  observers[[length(observers) + 1]] <- observeEvent(appMgr$ReportArtifacts, {
    CreateDownload('MAIN_REPORT', 'html', output, appMgr)
    CreateDownload('MAIN_REPORT', 'pdf', output, appMgr)
    CreateDownload('MAIN_REPORT', 'latex', output, appMgr)
    CreateDownload('MAIN_REPORT', 'word', output, appMgr)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$xmlModel, {
    appMgr$HIVModelMgr$LoadParameters(input$xmlModel)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$runModelBtn, {
    runSettings <- input$runModelBtn
    params <- runSettings$Params
    popCombination <- runSettings$PopCombination

    appMgr$HIVModelMgr$RunMainFit(
      settings = list(Verbose = FALSE),
      parameters = params,
      popCombination = popCombination
    )
  })

  observers[[length(observers) + 1]] <- observeEvent(input$cancelModelBtn, {
    appMgr$HIVModelMgr$CancelMainFit()
  })

  observers[[length(observers) + 1]] <- observeEvent(appMgr$HIVModelMgr$MainFitTask$HTMLRunLog, {
    appMgr$SendMessage(
      'MODELS_RUN_LOG_SET',
      payload = list(
        ActionStatus = 'SUCCESS',
        RunLog = appMgr$HIVModelMgr$MainFitTask$HTMLRunLog
      )
    )
  })

  observers[[length(observers) + 1]] <- observeEvent(appMgr$HIVModelMgr$MainFitResult, {
    CreateDownload('HIV_MAIN_FIT_DETAILED', 'rds', output, appMgr)
    CreateDownload('HIV_MAIN_FIT', 'csv', output, appMgr)
    CreateDownload('HIV_MAIN_FIT', 'rds', output, appMgr)
    CreateDownload('HIV_MAIN_FIT', 'dta', output, appMgr)
    CreateDownload('HIV_MAIN_FIT_EXCEL', 'xlsm', output, appMgr)
    CreateDownload('HIV_MAIN_FIT_EXCEL', 'xlsx', output, appMgr)
  })

  observers[[length(observers) + 1]] <- observeEvent(input$runBootstrapBtn, {
    params <- input$runBootstrapBtn
    appMgr$HIVModelMgr$RunBootstrapFit(
      bsCount = as.integer(params$count),
      bsType = params$type
    )
  })

  observers[[length(observers) + 1]] <- observeEvent(
    appMgr$HIVModelMgr$BootstrapFitTask$HTMLRunLog, {
    appMgr$SendMessage(
      'BOOTSTRAP_RUN_LOG_SET',
      payload = list(
        ActionStatus = 'SUCCESS',
        RunLog = appMgr$HIVModelMgr$BootstrapFitTask$HTMLRunLog
      )
    )
  })

  observers[[length(observers) + 1]] <- observeEvent(input$cancelBootstrapBtn, {
    appMgr$HIVModelMgr$CancelBootstrapFit()
  })

  observers[[length(observers) + 1]] <- observeEvent(appMgr$HIVModelMgr$BootstrapFitResult, {
    CreateDownload('HIV_BOOT_FIT_DETAILED', 'rds', output, appMgr)
    CreateDownload('HIV_BOOT_FIT', 'csv', output, appMgr)
    CreateDownload('HIV_BOOT_FIT', 'rds', output, appMgr)
    CreateDownload('HIV_BOOT_FIT', 'dta', output, appMgr)
    CreateDownload('HIV_BOOT_STAT_DETAILED', 'rds', output, appMgr)
    CreateDownload('HIV_BOOT_STAT', 'csv', output, appMgr)
    CreateDownload('HIV_BOOT_STAT', 'rds', output, appMgr)
    CreateDownload('HIV_BOOT_STAT', 'dta', output, appMgr)
  })

  CreateDownload('APP_MANAGER', 'rds', output, appMgr)

  observers[[length(observers) + 1]] <- observeEvent(
    input$seed,
    {
      appMgr$SetSeed(input$seed)
    },
    ignoreNULL = FALSE,
    ignoreInit = TRUE
  )

  return(observers)
}
