import { DEBUG } from './settings';
import {
  AdjustmentsReport, AdjustmentsRunLog, ReportingDelaysChartData, HIVPlotData
} from './initData';

export default appMgr => {
  if (!DEBUG) return;

  appMgr.setShinyState('DEBUGGING');

  appMgr.onShinyEvent({
    type: 'COMPLETED_STEPS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      CompletedSteps: 'SESSION_INITIALIZED'
    }
  });

  // 1. Upload case-based data
  appMgr.onShinyEvent({
    type: 'CASE_BASED_DATA_UPLOADED',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'Data has been uploaded successfully',
      FileName: 'asd',
      FilePath: 'asds',
      FileSize: 4000,
      FileType: 'asdas'
    }
  });

  // 2. Upload case-based data
  appMgr.onShinyEvent({
    type: 'CASE_BASED_DATA_READ',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'Data read correctly',
      ColumnNames: ['recordid', 'reportingcountry', 'age', 'gender'],
      RecordCount: 400,
      AttrMapping: [
        { attribute: 'RecordId', origColName: 'recordid', defaultValue: null, type: 'character' },
        { attribute: 'ReportingCountry', origColName: 'reportingcountry', defaultValue: null, type: 'character' },
        { attribute: 'Age', origColName: 'age', defaultValue: null, type: 'numeric' },
        { attribute: 'Gender', origColName: 'gender', defaultValue: null, type: 'character' },
        { attribute: 'DateOfArt', origColName: null, defaultValue: null, type: 'date' }
      ]
    }
  });

  appMgr.onShinyEvent({
    type: 'COMPLETED_STEPS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      CompletedSteps: ['SESSION_INITIALIZED', 'CASE_BASED_READ']
    }
  });

  appMgr.onShinyEvent({
    type: 'AGGR_DATA_UPLOADED',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'asd asd',
      FileName: 'asdasd',
      FilePath: 'asdd ads',
      FileSize: 7000,
      FileType: 'asdas asd'
    }
  });

  // 2b. Upload aggregated data
  appMgr.onShinyEvent({
    type: 'AGGR_DATA_READ',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'asd asd',
      DataFiles: [
        { name: 'Dead', use: true, years: [1980, 2015] },
        { name: 'AIDS', use: true, years: [1980, 2017] },
        { name: 'HIV, HIVAIDS', use: true, years: [1992, 2013] },
        { name: 'HIV_CD4_1, HIV_CD4_2, HIV_CD4_3, HIV_CD4_4', use: true, years: [1992, 2013] },
      ],
      PopulationNames: ['pop_0', 'pop_1'],
      RangeYears: [1980, 2017]
    }
  });

  appMgr.onShinyEvent({
    type: 'MODELS_YEAR_RANGES_DETERMINED',
    payload: {
      ActionStatus: "SUCCESS",
      ActionMessage: "Alllowed parameters determined",
      Years: {
        Range: {
          AIDS: [1980, 2016],
          Dead: [1980, 2017],
          HIV: [1980, 2016],
          HIV_CD4_1: [1980, 2016],
          HIV_CD4_2: [1980, 2016],
          HIV_CD4_3: [1980, 2016],
          HIV_CD4_4: [1980, 2016],
          HIVAIDS: [1985, 2016]
        },
        Optimal: {
          All: [1980, 2016],
          HIVCD4: [1984, 2016],
          HIV: [1979, 1979],
          AIDS: [1980, 1995],
          HIVAIDS: [1985, 2016]
        }
      }
    }
  });

  appMgr.onShinyEvent({
    type: 'CASE_BASED_ATTRIBUTE_MAPPING_APPLY_END',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'Attributes applied correctly',
      OriginDistribution: {
        FullRegionOfOrigin: [
          'REPCOUNTRY', 'SUBAFR', 'WESTEUR', 'SOUTHASIA', 'CENTEUR', 'CAR', 'LATAM', 'EASTEUR',
          'NORTHAM', 'NORTHAFRMIDEAST', 'EASTASIAPAC', 'AUSTNZ', 'UNK'
        ],
        Count: [1562, 2237, 1119, 164, 144, 123, 107, 58, 49, 43, 36, 33, 1944]
      },
      OriginGroupingPreset: 'REPCOUNTRY + UNK + OTHER',
      OriginGrouping: [
        {
          GroupedRegionOfOrigin: 'UNK',
          FullRegionOfOrigin: 'UNK',
          MigrantRegionOfOrigin: null
        },
        {
          GroupedRegionOfOrigin: 'OTHER',
          FullRegionOfOrigin: [
            'ABROAD', 'AUSTNZ', 'CAR', 'CENTEUR', 'EASTASIAPAC', 'EASTEUR', 'EUROPE', 'LATAM',
            'NORTHAFRMIDEAST', 'NORTHAM', 'SOUTHASIA', 'SUBAFR', 'WESTEUR'
          ],
          MigrantRegionOfOrigin: null
        },
        {
          GroupedRegionOfOrigin: 'REPCOUNTRY',
          FullRegionOfOrigin: 'REPCOUNTRY',
          MigrantRegionOfOrigin: null
        }
      ]
    }
  });

  appMgr.onShinyEvent({
    type: 'COMPLETED_STEPS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      CompletedSteps: ['SESSION_INITIALIZED', 'CASE_BASED_READ', 'CASE_BASED_ATTR_MAPPING']
    }
  });

  appMgr.onShinyEvent({
    type: 'CASE_BASED_DATA_ORIGIN_GROUPING_MIGRANT_CHECKED',
    payload: {
      ActionStatus: true,
      ActionMessage: 'Preset is compatible with the migration module'
    }
  });

  // 4. Set origin grouping
  appMgr.onShinyEvent({
    type: 'CASE_BASED_DATA_ORIGIN_GROUPING_APPLIED',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'Migrant variable regrouping applied correctly',
      Summary: {
        'DiagYearPlotData': {
          'filter': {
            'scaleMinYear': 1985,
            'scaleMaxYear': 2015,
            'valueMinYear': 1985,
            'valueMaxYear': 2015,
            'applyInAdjustments': false
          },
          'chartCategories': [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
          'chartData': [
            {
              'name': 'Male',
              'data': [38, 42, 30, 34, 28, 92, 70, 134, 131, 140, 162, 208, 224, 231, 198, 273, 283, 303, 333, 376, 327, 342, 401, 466, 459, 497, 601, 576, 646, 618, 571]
            },
            {
              'name': 'Female',
              'data': [11, 15, 12, 6, 13, 48, 37, 45, 67, 72, 85, 72, 118, 108, 146, 174, 160, 130, 157, 154, 175, 110, 112, 117, 133, 124, 143, 158, 125, 132, 154]
            }
          ]
        },
        'NotifQuarterPlotData': {
          'filter': {
            'scaleMinYear': 1985.125,
            'scaleMaxYear': 2016.375,
            'valueMinYear': 1985.125,
            'valueMaxYear': 2016.375,
            'applyInAdjustments': false
          },
          'chartCategories': [1985.125, 1985.375, 1985.625, 1985.875, 1986.125, 1986.375, 1986.625, 1986.875, 1987.125, 1987.375, 1987.625, 1987.875, 1988.125, 1988.375, 1988.625, 1988.875, 1989.125, 1989.375, 1989.625, 1989.875, 1990.125, 1990.375, 1990.625, 1990.875, 1991.125, 1991.375, 1991.625, 1991.875, 1992.125, 1992.375, 1992.625, 1992.875, 1993.125, 1993.375, 1993.625, 1993.875, 1994.125, 1994.375, 1994.625, 1994.875, 1995.125, 1995.375, 1995.625, 1995.875, 1996.125, 1996.375, 1996.625, 1996.875, 1997.125, 1997.375, 1997.625, 1997.875, 1998.125, 1998.375, 1998.625, 1998.875, 1999.125, 1999.375, 1999.625, 1999.875, 2000.125, 2000.375, 2000.625, 2000.875, 2001.125, 2001.375, 2001.625, 2001.875, 2002.125, 2002.375, 2002.625, 2002.875, 2003.125, 2003.375, 2003.625, 2003.875, 2004.125, 2004.375, 2004.625, 2004.875, 2005.125, 2005.375, 2005.625, 2005.875, 2006.125, 2006.375, 2006.625, 2006.875, 2007.125, 2007.375, 2007.625, 2007.875, 2008.125, 2008.375, 2008.625, 2008.875, 2009.125, 2009.375, 2009.625, 2009.875, 2010.125, 2010.375, 2010.625, 2010.875, 2011.125, 2011.375, 2011.625, 2011.875, 2012.125, 2012.375, 2012.625, 2012.875, 2013.125, 2013.375, 2013.625, 2013.875, 2014.125, 2014.375, 2014.625, 2014.875, 2015.125, 2015.375, 2015.625, 2015.875, 2016.125, 2016.375], 'chartData': [{ 'name': 'Male', 'data': [4, 11, 10, 10, 17, 8, 11, 4, 10, 8, 4, 3, 10, 12, 6, 3, 7, 3, 5, 7, 38, 16, 13, 11, 17, 15, 14, 6, 37, 25, 22, 24, 31, 29, 24, 24, 39, 26, 19, 18, 33, 22, 26, 26, 29, 38, 34, 32, 52, 32, 37, 44, 40, 54, 107, 114, 82, 68, 73, 50, 63, 55, 50, 57, 58, 61, 63, 56, 89, 129, 98, 133, 109, 88, 72, 102, 94, 88, 97, 98, 96, 73, 79, 87, 110, 93, 78, 72, 110, 96, 91, 101, 123, 128, 107, 100, 109, 115, 113, 132, 127, 110, 123, 127, 147, 126, 148, 182, 159, 160, 139, 137, 154, 157, 172, 159, 177, 150, 152, 151, 157, 148, 161, 127, 17, 2] }, { 'name': 'Female', 'data': [1, 0, 4, 6, 5, 9, 1, 0, 5, 2, 3, 2, 3, 1, 1, 0, 4, 3, 3, 2, 23, 13, 6, 5, 15, 9, 6, 7, 16, 12, 9, 7, 22, 18, 11, 11, 26, 21, 5, 14, 20, 18, 13, 18, 14, 17, 15, 18, 20, 23, 31, 21, 28, 22, 32, 33, 43, 28, 47, 37, 42, 28, 30, 40, 36, 30, 29, 36, 33, 67, 58, 45, 40, 40, 42, 51, 52, 23, 38, 38, 40, 50, 41, 44, 32, 27, 31, 28, 36, 26, 17, 30, 34, 18, 40, 27, 26, 28, 41, 41, 24, 40, 30, 27, 38, 38, 32, 40, 44, 47, 31, 36, 40, 41, 24, 22, 37, 34, 28, 35, 39, 40, 39, 37, 5, 2] }]
        }
      },
      MigrantCompatibility: {
        Valid: true
      }
    }
  });

  appMgr.onShinyEvent({
    type: 'COMPLETED_STEPS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      CompletedSteps: [
        'SESSION_INITIALIZED', 'CASE_BASED_READ', 'CASE_BASED_ATTR_MAPPING',
        'CASE_BASED_ORIGIN_GROUPING'
      ]
    }
  });

  // 4. Set origin grouping
  appMgr.onShinyEvent({
    type: 'CASE_BASED_SUMMARY_DATA_PREPARED',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'Summary prepared',
      Summary: {
        SelectedCount: 4345,
        TotalCount: 7168,
        MissPlotData: {
          selected: 'all',
          plot1: {
            chartCategories: ['CD4', 'Migrant', 'Transmission', 'Age'],
            chartData: {
              all: [0.25234234, 0.23, 0.19, 0.12],
              female: [0.35, 0.23, 0.19, 0.2],
              male: [0.45, 0.23, 0.19, 0.1]
            }
          },
          plot2: {
            chartCategories: ['CD4', 'Migrant', 'Transmission', 'Age'],
            chartData: {
              all: [
                [0, 0, 1], [0, 1, 0], [0, 2, 1], [0, 3, 1],
                [1, 0, 1], [1, 1, 1], [1, 2, 0], [1, 3, 0],
                [2, 0, 1], [2, 1, 0], [2, 2, 1], [2, 3, 0],
                [3, 0, 1], [3, 1, 1], [3, 2, 1], [3, 3, 0],
              ],
              female: [
                [0, 0, 1], [0, 1, 0], [0, 2, 1],
                [1, 0, 1], [1, 1, 1], [1, 2, 0],
                [2, 0, 1], [2, 1, 0], [2, 2, 1],
                [3, 0, 1], [3, 1, 1], [3, 2, 1],
              ],
              male: [
                [0, 0, 1], [0, 1, 0],
                [1, 0, 1], [1, 1, 1],
                [2, 0, 1], [2, 1, 0],
                [3, 0, 1], [3, 1, 1],
              ]
            }
          },
          plot3: {
            chartData: {
              all: [
                { name: 'Present', y: 0.2622 },
                { name: 'Missing', y: 0.14 },
                { name: 'Missing', y: 0.07 },
                { name: 'Missing', y: 0.03 },
              ],
              female: [
                { name: 'Present', y: 0.2622 },
                { name: 'Missing', y: 0.14 },
                { name: 'Missing', y: 0.07 }
              ],
              male: [
                { name: 'Present', y: 0.2622 },
                { name: 'Missing', y: 0.14 },
              ]
            },
          },
          plot4: {
            chartCategories: [1999, 2000, 2001, 2002, 2003],
            chartData: {
              all: [
                { name: 'CD4', data: [0.223423434, 0.3, 0.5, 0.2, 0.4] },
                { name: 'Migrant', data: [0.4, 0.1, 0.09, 0.1, 0.7] },
                { name: 'Transmission', data: [0.7, 0.5, 0.3, 0.12, 0.44] },
                { name: 'Age', data: [0.5, 0.2, 0.55, 0.6, 0.34] }
              ],
              female: [
                { name: 'CD4', data: [0.2, 0.3, 0.3, 0.2, 0.4] },
                { name: 'Migrant', data: [0.5, 0.1, 0.09, 0.1, 0.7] },
                { name: 'Transmission', data: [0.7, 0.5, 0.3, 0.32, 0.44] },
                { name: 'Age', data: [0.5, 0.2, 0.55, 0.6, 0.34] }
              ],
              male: [
                { name: 'CD4', data: [0.2, 0.3, 0.5, 0.2, 0.4] },
                { name: 'Migrant', data: [0.6, 0.1, 0.09, 0.1, 0.6] },
                { name: 'Transmission', data: [0.7, 0.5, 0.3, 0.12, 0.44] },
                { name: 'Age', data: [0.5, 0.2, 0.45, 0.5, 0.34] }
              ],
            }
          }
        },
        RepDelPlotData: {
          chartData: ReportingDelaysChartData
        }
      }
    }
  });

  appMgr.onShinyEvent({
    type: 'COMPLETED_STEPS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      CompletedSteps: [
        'SESSION_INITIALIZED', 'CASE_BASED_READ', 'CASE_BASED_ATTR_MAPPING',
        'CASE_BASED_ORIGIN_GROUPING', 'CASE_BASED_SUMMARY'
      ]
    }
  });

  appMgr.onShinyEvent({
    type: 'MIGRATION_RUN_FINISHED',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'Migration task finished',
      Stats: {
        Missingness: {
          Excluded: [
            'Not considered a migrant, because region of origin is the reporting country',
            'Migrant region of origin is missing',
            'Transmission is not of mode "MSM", "IDU", "HETERO" or "TRANSFU"',
            'Date of arrival is missing',
            'Date of arrival is before date of birth',
            'Age is below 16',
            'Total excluded',
            'Total used in estimation'
          ],
          Count: [2818, 1644, 1128, 1003, 5, 4, 6602, 816]
        },
        Imputation: {
          Imputation: '0',
          CountBeforeImputation: 551,
          CountAfterImputation: 816,
          CountImputed: 265,
          CountTotal: 7418
        },
        RegionDistr: {
          "chartCategoriesX": ["Africa", "Europe-North America", "Asia", "Other"],
          titleX: 'Region For Migration Module',
          "chartCategoriesY": [1953, 1959, 1960, 1964, 1965, 1966, 1974, 1976, 1977, 1978, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
          "seriesData": [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 1], [0, 4, 0], [0, 5, 1], [0, 6, 1], [0, 7, 0], [0, 8, 0], [0, 9, 1], [0, 10, 2], [0, 11, 1], [0, 12, 1], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 4], [0, 18, 6], [0, 19, 5], [0, 20, 7], [0, 21, 2], [0, 22, 2], [0, 23, 2], [0, 24, 0], [0, 25, 5], [0, 26, 2], [0, 27, 2], [0, 28, 2], [0, 29, 3], [0, 30, 5], [0, 31, 6], [0, 32, 7], [0, 33, 4], [0, 34, 3], [0, 35, 5], [0, 36, 9], [0, 37, 6], [0, 38, 4], [0, 39, 11], [0, 40, 12], [0, 41, 13], [0, 42, 18], [0, 43, 23], [0, 44, 38], [0, 45, 79], [0, 46, 92], [0, 47, 44], [1, 0, 1], [1, 1, 1], [1, 2, 1], [1, 3, 0], [1, 4, 1], [1, 5, 0], [1, 6, 1], [1, 7, 2], [1, 8, 1], [1, 9, 1], [1, 10, 0], [1, 11, 0], [1, 12, 0], [1, 13, 2], [1, 14, 0], [1, 15, 0], [1, 16, 2], [1, 17, 1], [1, 18, 1], [1, 19, 3], [1, 20, 2], [1, 21, 5], [1, 22, 2], [1, 23, 0], [1, 24, 3], [1, 25, 1], [1, 26, 2], [1, 27, 4], [1, 28, 0], [1, 29, 0], [1, 30, 5], [1, 31, 1], [1, 32, 3], [1, 33, 2], [1, 34, 5], [1, 35, 1], [1, 36, 5], [1, 37, 4], [1, 38, 2], [1, 39, 10], [1, 40, 6], [1, 41, 6], [1, 42, 11], [1, 43, 10], [1, 44, 24], [1, 45, 43], [1, 46, 44], [1, 47, 19], [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 0], [2, 11, 1], [2, 12, 1], [2, 13, 0], [2, 14, 0], [2, 15, 1], [2, 16, 0], [2, 17, 0], [2, 18, 0], [2, 19, 0], [2, 20, 0], [2, 21, 0], [2, 22, 0], [2, 23, 1], [2, 24, 0], [2, 25, 0], [2, 26, 0], [2, 27, 0], [2, 28, 0], [2, 29, 0], [2, 30, 0], [2, 31, 1], [2, 32, 0], [2, 33, 3], [2, 34, 0], [2, 35, 0], [2, 36, 2], [2, 37, 3], [2, 38, 5], [2, 39, 2], [2, 40, 3], [2, 41, 0], [2, 42, 2], [2, 43, 4], [2, 44, 5], [2, 45, 7], [2, 46, 5], [2, 47, 1], [3, 0, 0], [3, 1, 0], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 0], [3, 9, 0], [3, 10, 0], [3, 11, 0], [3, 12, 1], [3, 13, 0], [3, 14, 0], [3, 15, 0], [3, 16, 0], [3, 17, 1], [3, 18, 1], [3, 19, 0], [3, 20, 0], [3, 21, 1], [3, 22, 0], [3, 23, 0], [3, 24, 0], [3, 25, 0], [3, 26, 1], [3, 27, 0], [3, 28, 1], [3, 29, 2], [3, 30, 3], [3, 31, 0], [3, 32, 3], [3, 33, 1], [3, 34, 0], [3, 35, 2], [3, 36, 1], [3, 37, 2], [3, 38, 1], [3, 39, 0], [3, 40, 5], [3, 41, 5], [3, 42, 2], [3, 43, 8], [3, 44, 10], [3, 45, 16], [3, 46, 21], [3, 47, 7]],
          "dataMax": 92
        },
        YODDistr: {
          "Africa": {
            "chartCategoriesX": ["1985", "1986", "1987", "1988", "1989", "1990", "1991", "2015", "2016", "2017"],
            "titleX": "Year of Diagnosis",
            "chartCategoriesY": [1954, 1958, 1964, 1966, 1974, 1975, 1978, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
            "seriesData": [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 1], [0, 11, 0], [0, 12, 0], [0, 13, 0], [0, 14, 0], [0, 15, 0], [0, 16, 0], [0, 17, 0], [0, 18, 0], [0, 19, 0], [0, 20, 0], [0, 21, 0], [0, 22, 0], [0, 23, 0], [0, 24, 0], [0, 25, 0], [0, 26, 0], [0, 27, 0], [0, 28, 0], [0, 29, 0], [0, 30, 0], [0, 31, 0], [0, 32, 0], [0, 33, 0], [0, 34, 0], [0, 35, 0], [0, 36, 0], [0, 37, 0], [0, 38, 0], [0, 39, 0], [0, 40, 0], [0, 41, 0], [0, 42, 0], [0, 43, 0], [1, 0, 0], [1, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 0], [1, 11, 0], [1, 12, 0], [1, 13, 0], [1, 14, 0], [1, 15, 0], [1, 16, 0], [1, 17, 0], [1, 18, 0], [1, 19, 0], [1, 20, 0], [1, 21, 0], [1, 22, 0], [1, 23, 0], [1, 24, 0], [1, 25, 0], [1, 26, 0], [1, 27, 0], [1, 28, 0], [1, 29, 0], [1, 30, 0], [1, 31, 0], [1, 32, 0], [1, 33, 0], [1, 34, 0], [1, 35, 0], [1, 36, 0], [1, 37, 0], [1, 38, 0], [1, 39, 0], [1, 40, 0], [1, 41, 0], [1, 42, 0], [1, 43, 0], [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 1], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 1], [2, 9, 0], [2, 10, 0], [2, 11, 0], [2, 12, 1], [2, 13, 0], [2, 14, 0], [2, 15, 0], [2, 16, 0], [2, 17, 0], [2, 18, 0], [2, 19, 0], [2, 20, 0], [2, 21, 0], [2, 22, 0], [2, 23, 0], [2, 24, 0], [2, 25, 0], [2, 26, 0], [2, 27, 0], [2, 28, 0], [2, 29, 0], [2, 30, 0], [2, 31, 0], [2, 32, 0], [2, 33, 0], [2, 34, 0], [2, 35, 0], [2, 36, 0], [2, 37, 0], [2, 38, 0], [2, 39, 0], [2, 40, 0], [2, 41, 0], [2, 42, 0], [2, 43, 0], [3, 0, 0], [3, 1, 0], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 0], [3, 9, 0], [3, 10, 0], [3, 11, 1], [3, 12, 1], [3, 13, 1], [3, 14, 1], [3, 15, 3], [3, 16, 0], [3, 17, 0], [3, 18, 0], [3, 19, 0], [3, 20, 0], [3, 21, 0], [3, 22, 0], [3, 23, 0], [3, 24, 0], [3, 25, 0], [3, 26, 0], [3, 27, 0], [3, 28, 0], [3, 29, 0], [3, 30, 0], [3, 31, 0], [3, 32, 0], [3, 33, 0], [3, 34, 0], [3, 35, 0], [3, 36, 0], [3, 37, 0], [3, 38, 0], [3, 39, 0], [3, 40, 0], [3, 41, 0], [3, 42, 0], [3, 43, 0], [4, 0, 0], [4, 1, 0], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 0], [4, 11, 0], [4, 12, 0], [4, 13, 0], [4, 14, 1], [4, 15, 1], [4, 16, 1], [4, 17, 0], [4, 18, 0], [4, 19, 0], [4, 20, 0], [4, 21, 0], [4, 22, 0], [4, 23, 0], [4, 24, 0], [4, 25, 0], [4, 26, 0], [4, 27, 0], [4, 28, 0], [4, 29, 0], [4, 30, 0], [4, 31, 0], [4, 32, 0], [4, 33, 0], [4, 34, 0], [4, 35, 0], [4, 36, 0], [4, 37, 0], [4, 38, 0], [4, 39, 0], [4, 40, 0], [4, 41, 0], [4, 42, 0], [4, 43, 0], [5, 0, 0], [5, 1, 0], [5, 2, 0], [5, 3, 0], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 0], [5, 9, 0], [5, 10, 0], [5, 11, 0], [5, 12, 0], [5, 13, 0], [5, 14, 2], [5, 15, 0], [5, 16, 1], [5, 17, 3], [5, 18, 0], [5, 19, 0], [5, 20, 0], [5, 21, 0], [5, 22, 0], [5, 23, 0], [5, 24, 0], [5, 25, 0], [5, 26, 0], [5, 27, 0], [5, 28, 0], [5, 29, 0], [5, 30, 0], [5, 31, 0], [5, 32, 0], [5, 33, 0], [5, 34, 0], [5, 35, 0], [5, 36, 0], [5, 37, 0], [5, 38, 0], [5, 39, 0], [5, 40, 0], [5, 41, 0], [5, 42, 0], [5, 43, 0], [6, 0, 0], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 0], [6, 11, 0], [6, 12, 0], [6, 13, 0], [6, 14, 1], [6, 15, 0], [6, 16, 0], [6, 17, 3], [6, 18, 2], [6, 19, 0], [6, 20, 0], [6, 21, 0], [6, 22, 0], [6, 23, 0], [6, 24, 0], [6, 25, 0], [6, 26, 0], [6, 27, 0], [6, 28, 0], [6, 29, 0], [6, 30, 0], [6, 31, 0], [6, 32, 0], [6, 33, 0], [6, 34, 0], [6, 35, 0], [6, 36, 0], [6, 37, 0], [6, 38, 0], [6, 39, 0], [6, 40, 0], [6, 41, 0], [6, 42, 0], [6, 43, 0], [7, 0, 0], [7, 1, 0], [7, 2, 0], [7, 3, 0], [7, 4, 0], [7, 5, 0], [7, 6, 0], [7, 7, 0], [7, 8, 0], [7, 9, 0], [7, 10, 0], [7, 11, 0], [7, 12, 0], [7, 13, 0], [7, 14, 0], [7, 15, 0], [7, 16, 0], [7, 17, 1], [7, 18, 0], [7, 19, 0], [7, 20, 0], [7, 21, 4], [7, 22, 2], [7, 23, 1], [7, 24, 1], [7, 25, 4], [7, 26, 2], [7, 27, 3], [7, 28, 2], [7, 29, 3], [7, 30, 1], [7, 31, 0], [7, 32, 2], [7, 33, 2], [7, 34, 3], [7, 35, 4], [7, 36, 4], [7, 37, 7], [7, 38, 8], [7, 39, 9], [7, 40, 21], [7, 41, 30], [7, 42, 0], [7, 43, 0], [8, 0, 1], [8, 1, 0], [8, 2, 0], [8, 3, 0], [8, 4, 0], [8, 5, 0], [8, 6, 0], [8, 7, 0], [8, 8, 0], [8, 9, 0], [8, 10, 0], [8, 11, 0], [8, 12, 3], [8, 13, 0], [8, 14, 1], [8, 15, 0], [8, 16, 2], [8, 17, 1], [8, 18, 0], [8, 19, 2], [8, 20, 0], [8, 21, 0], [8, 22, 4], [8, 23, 0], [8, 24, 0], [8, 25, 0], [8, 26, 2], [8, 27, 2], [8, 28, 4], [8, 29, 1], [8, 30, 1], [8, 31, 1], [8, 32, 6], [8, 33, 2], [8, 34, 3], [8, 35, 3], [8, 36, 10], [8, 37, 5], [8, 38, 6], [8, 39, 6], [8, 40, 10], [8, 41, 29], [8, 42, 56], [8, 43, 0], [9, 0, 0], [9, 1, 0], [9, 2, 0], [9, 3, 0], [9, 4, 0], [9, 5, 0], [9, 6, 1], [9, 7, 1], [9, 8, 1], [9, 9, 0], [9, 10, 0], [9, 11, 0], [9, 12, 1], [9, 13, 0], [9, 14, 0], [9, 15, 0], [9, 16, 2], [9, 17, 1], [9, 18, 0], [9, 19, 0], [9, 20, 1], [9, 21, 1], [9, 22, 0], [9, 23, 2], [9, 24, 1], [9, 25, 0], [9, 26, 0], [9, 27, 1], [9, 28, 2], [9, 29, 1], [9, 30, 0], [9, 31, 3], [9, 32, 1], [9, 33, 1], [9, 34, 0], [9, 35, 3], [9, 36, 2], [9, 37, 5], [9, 38, 5], [9, 39, 5], [9, 40, 8], [9, 41, 9], [9, 42, 33], [9, 43, 40]],
            "dataMax": 56
          },
          "Europe-North America": {
            "chartCategoriesX": ["1985", "1986", "1987", "1988", "1990", "1991", "2015", "2016", "2017"],
            "titleX": "Year of Diagnosis",
            "chartCategoriesY": [1974, 1976, 1980, 1984, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1995, 1996, 1997, 1998, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], "seriesData": [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 1], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 0], [0, 12, 0], [0, 13, 0], [0, 14, 0], [0, 15, 0], [0, 16, 0], [0, 17, 0], [0, 18, 0], [0, 19, 0], [0, 20, 0], [0, 21, 0], [0, 22, 0], [0, 23, 0], [0, 24, 0], [0, 25, 0], [0, 26, 0], [0, 27, 0], [0, 28, 0], [0, 29, 0], [0, 30, 0], [0, 31, 0], [0, 32, 0], [1, 0, 0], [1, 1, 0], [1, 2, 1], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 0], [1, 11, 0], [1, 12, 0], [1, 13, 0], [1, 14, 0], [1, 15, 0], [1, 16, 0], [1, 17, 0], [1, 18, 0], [1, 19, 0], [1, 20, 0], [1, 21, 0], [1, 22, 0], [1, 23, 0], [1, 24, 0], [1, 25, 0], [1, 26, 0], [1, 27, 0], [1, 28, 0], [1, 29, 0], [1, 30, 0], [1, 31, 0], [1, 32, 0], [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 2], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 0], [2, 11, 0], [2, 12, 0], [2, 13, 0], [2, 14, 0], [2, 15, 0], [2, 16, 0], [2, 17, 0], [2, 18, 0], [2, 19, 0], [2, 20, 0], [2, 21, 0], [2, 22, 0], [2, 23, 0], [2, 24, 0], [2, 25, 0], [2, 26, 0], [2, 27, 0], [2, 28, 0], [2, 29, 0], [2, 30, 0], [2, 31, 0], [2, 32, 0], [3, 0, 0], [3, 1, 1], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 0], [3, 9, 0], [3, 10, 0], [3, 11, 0], [3, 12, 0], [3, 13, 0], [3, 14, 0], [3, 15, 0], [3, 16, 0], [3, 17, 0], [3, 18, 0], [3, 19, 0], [3, 20, 0], [3, 21, 0], [3, 22, 0], [3, 23, 0], [3, 24, 0], [3, 25, 0], [3, 26, 0], [3, 27, 0], [3, 28, 0], [3, 29, 0], [3, 30, 0], [3, 31, 0], [3, 32, 0], [4, 0, 0], [4, 1, 0], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 0], [4, 6, 0], [4, 7, 1], [4, 8, 0], [4, 9, 0], [4, 10, 0], [4, 11, 0], [4, 12, 0], [4, 13, 0], [4, 14, 0], [4, 15, 0], [4, 16, 0], [4, 17, 0], [4, 18, 0], [4, 19, 0], [4, 20, 0], [4, 21, 0], [4, 22, 0], [4, 23, 0], [4, 24, 0], [4, 25, 0], [4, 26, 0], [4, 27, 0], [4, 28, 0], [4, 29, 0], [4, 30, 0], [4, 31, 0], [4, 32, 0], [5, 0, 0], [5, 1, 0], [5, 2, 0], [5, 3, 0], [5, 4, 0], [5, 5, 2], [5, 6, 0], [5, 7, 0], [5, 8, 0], [5, 9, 2], [5, 10, 0], [5, 11, 0], [5, 12, 0], [5, 13, 0], [5, 14, 0], [5, 15, 0], [5, 16, 0], [5, 17, 0], [5, 18, 0], [5, 19, 0], [5, 20, 0], [5, 21, 0], [5, 22, 0], [5, 23, 0], [5, 24, 0], [5, 25, 0], [5, 26, 0], [5, 27, 0], [5, 28, 0], [5, 29, 0], [5, 30, 0], [5, 31, 0], [5, 32, 0], [6, 0, 0], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 1], [6, 10, 0], [6, 11, 2], [6, 12, 0], [6, 13, 2], [6, 14, 0], [6, 15, 2], [6, 16, 0], [6, 17, 0], [6, 18, 2], [6, 19, 1], [6, 20, 2], [6, 21, 0], [6, 22, 1], [6, 23, 2], [6, 24, 3], [6, 25, 1], [6, 26, 1], [6, 27, 1], [6, 28, 3], [6, 29, 20], [6, 30, 15], [6, 31, 0], [6, 32, 0], [7, 0, 0], [7, 1, 1], [7, 2, 0], [7, 3, 0], [7, 4, 1], [7, 5, 0], [7, 6, 0], [7, 7, 1], [7, 8, 0], [7, 9, 0], [7, 10, 0], [7, 11, 0], [7, 12, 1], [7, 13, 0], [7, 14, 0], [7, 15, 2], [7, 16, 0], [7, 17, 2], [7, 18, 1], [7, 19, 1], [7, 20, 0], [7, 21, 2], [7, 22, 2], [7, 23, 1], [7, 24, 3], [7, 25, 6], [7, 26, 3], [7, 27, 7], [7, 28, 3], [7, 29, 5], [7, 30, 26], [7, 31, 29], [7, 32, 0], [8, 0, 1], [8, 1, 0], [8, 2, 0], [8, 3, 0], [8, 4, 1], [8, 5, 0], [8, 6, 1], [8, 7, 1], [8, 8, 1], [8, 9, 0], [8, 10, 2], [8, 11, 0], [8, 12, 1], [8, 13, 1], [8, 14, 1], [8, 15, 0], [8, 16, 1], [8, 17, 2], [8, 18, 0], [8, 19, 4], [8, 20, 1], [8, 21, 0], [8, 22, 3], [8, 23, 0], [8, 24, 1], [8, 25, 1], [8, 26, 1], [8, 27, 3], [8, 28, 0], [8, 29, 3], [8, 30, 6], [8, 31, 12], [8, 32, 24]],
            "dataMax": 29
          },
          "Asia": {
            "chartCategoriesX": ["2015", "2016", "2017"],
            "titleX": "Year of Diagnosis",
            "chartCategoriesY": [1981, 1982, 1989, 1993, 2000, 2001, 2003, 2006, 2007, 2008, 2009, 2010, 2012, 2013, 2014, 2015, 2016, 2017],
            "seriesData": [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 1], [0, 5, 0], [0, 6, 0], [0, 7, 1], [0, 8, 0], [0, 9, 1], [0, 10, 1], [0, 11, 0], [0, 12, 1], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 0], [0, 17, 0], [1, 0, 0], [1, 1, 1], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 2], [1, 7, 2], [1, 8, 2], [1, 9, 0], [1, 10, 1], [1, 11, 0], [1, 12, 2], [1, 13, 2], [1, 14, 2], [1, 15, 1], [1, 16, 2], [1, 17, 0], [2, 0, 1], [2, 1, 0], [2, 2, 1], [2, 3, 1], [2, 4, 1], [2, 5, 1], [2, 6, 0], [2, 7, 1], [2, 8, 2], [2, 9, 2], [2, 10, 0], [2, 11, 1], [2, 12, 1], [2, 13, 1], [2, 14, 1], [2, 15, 1], [2, 16, 4], [2, 17, 1]],
            "dataMax": 4
          },
          "Other": {
            "chartCategoriesX": ["1988", "1991", "2015", "2016", "2017"],
            "titleX": "Year of Diagnosis",
            "chartCategoriesY": [1977, 1982, 1987, 1991, 1996, 1998, 1999, 2000, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
            "seriesData": [[0, 0, 1], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 0], [0, 12, 0], [0, 13, 0], [0, 14, 0], [0, 15, 0], [0, 16, 0], [0, 17, 0], [0, 18, 0], [0, 19, 0], [0, 20, 0], [0, 21, 0], [0, 22, 0], [0, 23, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 3, 1], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 0], [1, 11, 0], [1, 12, 0], [1, 13, 0], [1, 14, 0], [1, 15, 0], [1, 16, 0], [1, 17, 0], [1, 18, 0], [1, 19, 0], [1, 20, 0], [1, 21, 0], [1, 22, 0], [1, 23, 0], [2, 0, 0], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 2], [2, 5, 0], [2, 6, 0], [2, 7, 1], [2, 8, 2], [2, 9, 1], [2, 10, 1], [2, 11, 1], [2, 12, 0], [2, 13, 1], [2, 14, 0], [2, 15, 0], [2, 16, 1], [2, 17, 2], [2, 18, 2], [2, 19, 1], [2, 20, 5], [2, 21, 3], [2, 22, 0], [2, 23, 0], [3, 0, 0], [3, 1, 0], [3, 2, 0], [3, 3, 0], [3, 4, 1], [3, 5, 0], [3, 6, 2], [3, 7, 2], [3, 8, 2], [3, 9, 0], [3, 10, 1], [3, 11, 0], [3, 12, 0], [3, 13, 0], [3, 14, 1], [3, 15, 1], [3, 16, 1], [3, 17, 2], [3, 18, 1], [3, 19, 4], [3, 20, 1], [3, 21, 10], [3, 22, 5], [3, 23, 0], [4, 0, 0], [4, 1, 0], [4, 2, 1], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 1], [4, 8, 0], [4, 9, 0], [4, 10, 0], [4, 11, 2], [4, 12, 1], [4, 13, 1], [4, 14, 1], [4, 15, 0], [4, 16, 3], [4, 17, 2], [4, 18, 0], [4, 19, 1], [4, 20, 1], [4, 21, 3], [4, 22, 10], [4, 23, 7]],
            "dataMax": 10
          }
        },
        TableDistr: {
          Total: { Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
          Sex: [
            { Category: 'Sex:', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'M', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'F', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 }
          ],
          Age: [
            { Category: 'Age group:', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: '<25', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: '25-39', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: '40-54', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: '55+', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 }
          ],
          Transmission: [
            { Category: 'Transmission category:', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'MSM', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'IDU', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'HETERO', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'TRANSFU', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 }
          ],
          RegionOfOrigin: [
            { Category: 'Region of origin:', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'REPCOUNTRY', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'UNK', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'EUROPE-NORTH AMERICA', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 },
            { Category: 'AFRICA', Count: 10, PriorProp: 0.45, PriorLB: 0.35, PriorUB: 0.5, PostProp: 0.7, PostLB: 0.6, PostUB: 0.78 }
          ]
        }
      }
    }
  });

  appMgr.onShinyEvent({
    type: 'ADJUSTMENTS_RUN_LOG_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      RunLog: AdjustmentsRunLog
    }
  });

  // 4. Set origin grouping
  appMgr.onShinyEvent({
    type: 'ADJUSTMENTS_RUN_FINISHED',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'Running adjustment task finished',
      AdjustmentsReport: AdjustmentsReport,
      RunAdjustmentsTypes: ['MULTIPLE_IMPUTATIONS', 'REPORTING_DELAYS']
    }
  });

  appMgr.onShinyEvent({
    type: 'COMPLETED_STEPS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      CompletedSteps: [
        'SESSION_INITIALIZED', 'CASE_BASED_READ', 'CASE_BASED_ATTR_MAPPING',
        'CASE_BASED_ORIGIN_GROUPING', 'CASE_BASED_SUMMARY', 'CASE_BASED_ADJUSTMENTS'
      ]
    }
  });

  appMgr.onShinyEvent({
    type: 'CREATING_REPORT_FINISHED',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'Running report task finished',
      Report: 'Test report'
    }
  });

  appMgr.onShinyEvent({
    type: 'COMPLETED_STEPS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      CompletedSteps: [
        'SESSION_INITIALIZED', 'CASE_BASED_READ', 'CASE_BASED_ATTR_MAPPING',
        'CASE_BASED_ORIGIN_GROUPING', 'CASE_BASED_SUMMARY', 'CASE_BASED_ADJUSTMENTS', 'REPORTS'
      ]
    }
  });

  // 8. Available strata set
  appMgr.onShinyEvent({
    type: 'AVAILABLE_STRATA_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      AvailableVariables: [
        { 'Name': 'Gender', 'Code': 'G' },
        { 'Name': 'Transmission', 'Code': 'T' },
        { 'Name': 'GroupedRegionOfOrigin', 'Code': 'O' },
        { 'Name': 'PlaceOfResidence', 'Code': 'R' }
      ],
      AvailableStrata: {
        'Gender': [
          { 'Combination': 'F [G]', 'Count': 2706, 'Perc': 0.3552 },
          { 'Combination': 'M [G]', 'Count': 4913, 'Perc': 0.6448 }
        ],
        'Transmission': [
          { 'Combination': 'HETERO [T]', 'Count': 3368, 'Perc': 0.4421 },
          { 'Combination': 'IDU [T]', 'Count': 144, 'Perc': 0.0189 },
          { 'Combination': 'MSM [T]', 'Count': 2526, 'Perc': 0.3315 },
          { 'Combination': 'NA [T]', 'Count': 1581, 'Perc': 0.2075 }
        ],
        'GroupedRegionOfOrigin': [
          { 'Combination': 'NA [O]', 'Count': 1944, 'Perc': 0.2552 },
          { 'Combination': 'OTHER [O]', 'Count': 4113, 'Perc': 0.5398 },
          { 'Combination': 'REPCOUNTRY [O]', 'Count': 1562, 'Perc': 0.205 }
        ],
        'PlaceOfResidence': [
          { 'Combination': 'NA [R]', 'Count': 7619, 'Perc': 1 }
        ],
        'Gender, Transmission': [
          { 'Combination': 'F [G], HETERO [T]', 'Count': 2092, 'Perc': 0.2746 },
          { 'Combination': 'F [G], IDU [T]', 'Count': 36, 'Perc': 0.0047 },
          { 'Combination': 'F [G], NA [T]', 'Count': 578, 'Perc': 0.0759 },
          { 'Combination': 'M [G], HETERO [T]', 'Count': 1276, 'Perc': 0.1675 },
          { 'Combination': 'M [G], IDU [T]', 'Count': 108, 'Perc': 0.0142 },
          { 'Combination': 'M [G], MSM [T]', 'Count': 2526, 'Perc': 0.3315 },
          { 'Combination': 'M [G], NA [T]', 'Count': 1003, 'Perc': 0.1316 }
        ],
        'Gender, GroupedRegionOfOrigin': [
          { 'Combination': 'F [G], NA [O]', 'Count': 708, 'Perc': 0.0929 },
          { 'Combination': 'F [G], OTHER [O]', 'Count': 1775, 'Perc': 0.233 },
          { 'Combination': 'F [G], REPCOUNTRY [O]', 'Count': 223, 'Perc': 0.0293 },
          { 'Combination': 'M [G], NA [O]', 'Count': 1236, 'Perc': 0.1622 },
          { 'Combination': 'M [G], OTHER [O]', 'Count': 2338, 'Perc': 0.3069 },
          { 'Combination': 'M [G], REPCOUNTRY [O]', 'Count': 1339, 'Perc': 0.1757 }
        ],
        'Gender, PlaceOfResidence': [
          { 'Combination': 'F [G], NA [R]', 'Count': 2706, 'Perc': 0.3552 },
          { 'Combination': 'M [G], NA [R]', 'Count': 4913, 'Perc': 0.6448 }
        ],
        'Transmission, GroupedRegionOfOrigin': [
          { 'Combination': 'HETERO [T], NA [O]', 'Count': 868, 'Perc': 0.1139 },
          { 'Combination': 'HETERO [T], OTHER [O]', 'Count': 2179, 'Perc': 0.286 },
          { 'Combination': 'HETERO [T], REPCOUNTRY [O]', 'Count': 321, 'Perc': 0.0421 },
          { 'Combination': 'IDU [T], NA [O]', 'Count': 42, 'Perc': 0.0055 },
          { 'Combination': 'IDU [T], OTHER [O]', 'Count': 69, 'Perc': 0.0091 },
          { 'Combination': 'IDU [T], REPCOUNTRY [O]', 'Count': 33, 'Perc': 0.0043 },
          { 'Combination': 'MSM [T], NA [O]', 'Count': 634, 'Perc': 0.0832 },
          { 'Combination': 'MSM [T], OTHER [O]', 'Count': 1017, 'Perc': 0.1335 },
          { 'Combination': 'MSM [T], REPCOUNTRY [O]', 'Count': 875, 'Perc': 0.1148 },
          { 'Combination': 'NA [T], NA [O]', 'Count': 400, 'Perc': 0.0525 },
          { 'Combination': 'NA [T], OTHER [O]', 'Count': 848, 'Perc': 0.1113 },
          { 'Combination': 'NA [T], REPCOUNTRY [O]', 'Count': 333, 'Perc': 0.0437 }
        ],
        'Transmission, PlaceOfResidence': [
          { 'Combination': 'HETERO [T], NA [R]', 'Count': 3368, 'Perc': 0.4421 },
          { 'Combination': 'IDU [T], NA [R]', 'Count': 144, 'Perc': 0.0189 },
          { 'Combination': 'MSM [T], NA [R]', 'Count': 2526, 'Perc': 0.3315 },
          { 'Combination': 'NA [T], NA [R]', 'Count': 1581, 'Perc': 0.2075 }
        ],
        'GroupedRegionOfOrigin, PlaceOfResidence': [
          { 'Combination': 'NA [O], NA [R]', 'Count': 1944, 'Perc': 0.2552 },
          { 'Combination': 'OTHER [O], NA [R]', 'Count': 4113, 'Perc': 0.5398 },
          { 'Combination': 'REPCOUNTRY [O], NA [R]', 'Count': 1562, 'Perc': 0.205 }
        ],
        'Gender, Transmission, GroupedRegionOfOrigin': [
          { 'Combination': 'F [G], HETERO [T], NA [O]', 'Count': 545, 'Perc': 0.0715 },
          { 'Combination': 'F [G], HETERO [T], OTHER [O]', 'Count': 1389, 'Perc': 0.1823 },
          { 'Combination': 'F [G], HETERO [T], REPCOUNTRY [O]', 'Count': 158, 'Perc': 0.0207 },
          { 'Combination': 'F [G], IDU [T], NA [O]', 'Count': 9, 'Perc': 0.0012 },
          { 'Combination': 'F [G], IDU [T], OTHER [O]', 'Count': 18, 'Perc': 0.0024 },
          { 'Combination': 'F [G], IDU [T], REPCOUNTRY [O]', 'Count': 9, 'Perc': 0.0012 },
          { 'Combination': 'F [G], NA [T], NA [O]', 'Count': 154, 'Perc': 0.0202 },
          { 'Combination': 'F [G], NA [T], OTHER [O]', 'Count': 368, 'Perc': 0.0483 },
          { 'Combination': 'F [G], NA [T], REPCOUNTRY [O]', 'Count': 56, 'Perc': 0.0074 },
          { 'Combination': 'M [G], HETERO [T], NA [O]', 'Count': 323, 'Perc': 0.0424 },
          { 'Combination': 'M [G], HETERO [T], OTHER [O]', 'Count': 790, 'Perc': 0.1037 },
          { 'Combination': 'M [G], HETERO [T], REPCOUNTRY [O]', 'Count': 163, 'Perc': 0.0214 },
          { 'Combination': 'M [G], IDU [T], NA [O]', 'Count': 33, 'Perc': 0.0043 },
          { 'Combination': 'M [G], IDU [T], OTHER [O]', 'Count': 51, 'Perc': 0.0067 },
          { 'Combination': 'M [G], IDU [T], REPCOUNTRY [O]', 'Count': 24, 'Perc': 0.0032 },
          { 'Combination': 'M [G], MSM [T], NA [O]', 'Count': 634, 'Perc': 0.0832 },
          { 'Combination': 'M [G], MSM [T], OTHER [O]', 'Count': 1017, 'Perc': 0.1335 },
          { 'Combination': 'M [G], MSM [T], REPCOUNTRY [O]', 'Count': 875, 'Perc': 0.1148 },
          { 'Combination': 'M [G], NA [T], NA [O]', 'Count': 246, 'Perc': 0.0323 },
          { 'Combination': 'M [G], NA [T], OTHER [O]', 'Count': 480, 'Perc': 0.063 },
          { 'Combination': 'M [G], NA [T], REPCOUNTRY [O]', 'Count': 277, 'Perc': 0.0364 }
        ],
        'Gender, Transmission, PlaceOfResidence': [
          { 'Combination': 'F [G], HETERO [T], NA [R]', 'Count': 2092, 'Perc': 0.2746 },
          { 'Combination': 'F [G], IDU [T], NA [R]', 'Count': 36, 'Perc': 0.0047 },
          { 'Combination': 'F [G], NA [T], NA [R]', 'Count': 578, 'Perc': 0.0759 },
          { 'Combination': 'M [G], HETERO [T], NA [R]', 'Count': 1276, 'Perc': 0.1675 },
          { 'Combination': 'M [G], IDU [T], NA [R]', 'Count': 108, 'Perc': 0.0142 },
          { 'Combination': 'M [G], MSM [T], NA [R]', 'Count': 2526, 'Perc': 0.3315 },
          { 'Combination': 'M [G], NA [T], NA [R]', 'Count': 1003, 'Perc': 0.1316 }
        ],
        'Gender, GroupedRegionOfOrigin, PlaceOfResidence': [
          { 'Combination': 'F [G], NA [O], NA [R]', 'Count': 708, 'Perc': 0.0929 },
          { 'Combination': 'F [G], OTHER [O], NA [R]', 'Count': 1775, 'Perc': 0.233 },
          { 'Combination': 'F [G], REPCOUNTRY [O], NA [R]', 'Count': 223, 'Perc': 0.0293 },
          { 'Combination': 'M [G], NA [O], NA [R]', 'Count': 1236, 'Perc': 0.1622 },
          { 'Combination': 'M [G], OTHER [O], NA [R]', 'Count': 2338, 'Perc': 0.3069 },
          { 'Combination': 'M [G], REPCOUNTRY [O], NA [R]', 'Count': 1339, 'Perc': 0.1757 }
        ],
        'Transmission, GroupedRegionOfOrigin, PlaceOfResidence': [
          { 'Combination': 'HETERO [T], NA [O], NA [R]', 'Count': 868, 'Perc': 0.1139 },
          { 'Combination': 'HETERO [T], OTHER [O], NA [R]', 'Count': 2179, 'Perc': 0.286 },
          { 'Combination': 'HETERO [T], REPCOUNTRY [O], NA [R]', 'Count': 321, 'Perc': 0.0421 },
          { 'Combination': 'IDU [T], NA [O], NA [R]', 'Count': 42, 'Perc': 0.0055 },
          { 'Combination': 'IDU [T], OTHER [O], NA [R]', 'Count': 69, 'Perc': 0.0091 },
          { 'Combination': 'IDU [T], REPCOUNTRY [O], NA [R]', 'Count': 33, 'Perc': 0.0043 },
          { 'Combination': 'MSM [T], NA [O], NA [R]', 'Count': 634, 'Perc': 0.0832 },
          { 'Combination': 'MSM [T], OTHER [O], NA [R]', 'Count': 1017, 'Perc': 0.1335 },
          { 'Combination': 'MSM [T], REPCOUNTRY [O], NA [R]', 'Count': 875, 'Perc': 0.1148 },
          { 'Combination': 'NA [T], NA [O], NA [R]', 'Count': 400, 'Perc': 0.0525 },
          { 'Combination': 'NA [T], OTHER [O], NA [R]', 'Count': 848, 'Perc': 0.1113 },
          { 'Combination': 'NA [T], REPCOUNTRY [O], NA [R]', 'Count': 333, 'Perc': 0.0437 }
        ],
        'Gender, Transmission, GroupedRegionOfOrigin, PlaceOfResidence': [
          { 'Combination': 'F [G], HETERO [T], NA [O], NA [R]', 'Count': 545, 'Perc': 0.0715 },
          { 'Combination': 'F [G], HETERO [T], OTHER [O], NA [R]', 'Count': 1389, 'Perc': 0.1823 },
          { 'Combination': 'F [G], HETERO [T], REPCOUNTRY [O], NA [R]', 'Count': 158, 'Perc': 0.0207 },
          { 'Combination': 'F [G], IDU [T], NA [O], NA [R]', 'Count': 9, 'Perc': 0.0012 },
          { 'Combination': 'F [G], IDU [T], OTHER [O], NA [R]', 'Count': 18, 'Perc': 0.0024 },
          { 'Combination': 'F [G], IDU [T], REPCOUNTRY [O], NA [R]', 'Count': 9, 'Perc': 0.0012 },
          { 'Combination': 'F [G], NA [T], NA [O], NA [R]', 'Count': 154, 'Perc': 0.0202 },
          { 'Combination': 'F [G], NA [T], OTHER [O], NA [R]', 'Count': 368, 'Perc': 0.0483 },
          { 'Combination': 'F [G], NA [T], REPCOUNTRY [O], NA [R]', 'Count': 56, 'Perc': 0.0074 },
          { 'Combination': 'M [G], HETERO [T], NA [O], NA [R]', 'Count': 323, 'Perc': 0.0424 },
          { 'Combination': 'M [G], HETERO [T], OTHER [O], NA [R]', 'Count': 790, 'Perc': 0.1037 },
          { 'Combination': 'M [G], HETERO [T], REPCOUNTRY [O], NA [R]', 'Count': 163, 'Perc': 0.0214 },
          { 'Combination': 'M [G], IDU [T], NA [O], NA [R]', 'Count': 33, 'Perc': 0.0043 },
          { 'Combination': 'M [G], IDU [T], OTHER [O], NA [R]', 'Count': 51, 'Perc': 0.0067 },
          { 'Combination': 'M [G], IDU [T], REPCOUNTRY [O], NA [R]', 'Count': 24, 'Perc': 0.0032 },
          { 'Combination': 'M [G], MSM [T], NA [O], NA [R]', 'Count': 634, 'Perc': 0.0832 },
          { 'Combination': 'M [G], MSM [T], OTHER [O], NA [R]', 'Count': 1017, 'Perc': 0.1335 },
          { 'Combination': 'M [G], MSM [T], REPCOUNTRY [O], NA [R]', 'Count': 875, 'Perc': 0.1148 },
          { 'Combination': 'M [G], NA [T], NA [O], NA [R]', 'Count': 246, 'Perc': 0.0323 },
          { 'Combination': 'M [G], NA [T], OTHER [O], NA [R]', 'Count': 480, 'Perc': 0.063 },
          { 'Combination': 'M [G], NA [T], REPCOUNTRY [O], NA [R]', 'Count': 277, 'Perc': 0.0364 }
        ]
      }
    }
  });

  // 9. Read model parameters
  appMgr.onShinyEvent({
    type: 'MODELS_PARAMS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      Params: {
        'minYear': 1980,
        'maxYear': 2016,
        'minFitPos': 1979,
        'maxFitPos': 1979,
        'minFitCD4': 1984,
        'maxFitCD4': 2016,
        'minFitAIDS': 1984,
        'maxFitAIDS': 1995,
        'minFitHIVAIDS': 1996,
        'maxFitHIVAIDS': 2016,
        'country': 'NL',
        'knotsCount': 6,
        'startIncZero': true,
        'distributionFit': 'NEGATIVE_BINOMIAL',
        'rDisp': 50,
        'delta4Fac': 0,
        'maxIncCorr': true,
        'splineType': 'B-SPLINE',
        'fullData': true,
        'timeIntervals': [
          { 'startYear': 1980, 'jump': false, 'changeInInterval': false, 'diffByCD4': false, 'endYear': 1984 },
          { 'startYear': 1984, 'jump': true,  'changeInInterval': false, 'diffByCD4': false, 'endYear': 1996 },
          { 'startYear': 1996, 'jump': false, 'changeInInterval': false, 'diffByCD4': false, 'endYear': 2000 },
          { 'startYear': 2000, 'jump': false, 'changeInInterval': false, 'diffByCD4': false, 'endYear': 2005 },
          { 'startYear': 2005, 'jump': false, 'changeInInterval': false, 'diffByCD4': false, 'endYear': 2010 },
          { 'startYear': 2010, 'jump': false, 'changeInInterval': false, 'diffByCD4': false, 'endYear': 2016 }
        ]
      }
    }
  });
  appMgr.modelMgr.setModelsParamFileName('Partial data model.xml');

  // 10. Model run log set
  appMgr.onShinyEvent({
    type: 'MODELS_RUN_LOG_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      RunLog: `<span style='color: #00BBBB;'>--</span><span> </span><span style='font-weight: bold;'>1. Context</span>`
    }
  });

  appMgr.onShinyEvent({
    type: 'COMPLETED_STEPS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      CompletedSteps: [
        'SESSION_INITIALIZED', 'CASE_BASED_READ', 'CASE_BASED_ATTR_MAPPING',
        'CASE_BASED_ORIGIN_GROUPING', 'CASE_BASED_SUMMARY', 'CASE_BASED_ADJUSTMENTS', 'REPORTS',
        'AGGR_READ', 'MODELLING'
      ]
    }
  });

  // 10. Model run log set
  appMgr.onShinyEvent({
    type: 'BOOTSTRAP_RUN_FINISHED',
    payload: {
      ActionStatus: 'SUCCESS',
      ActionMessage: 'Running HIV Model bootstrap fit task finished',
      PlotData: HIVPlotData
    }
  });

  appMgr.onShinyEvent({
    type: 'COMPLETED_STEPS_SET',
    payload: {
      ActionStatus: 'SUCCESS',
      CompletedSteps: [
        'SESSION_INITIALIZED', 'CASE_BASED_READ', 'CASE_BASED_ATTR_MAPPING',
        'CASE_BASED_ORIGIN_GROUPING', 'CASE_BASED_SUMMARY', 'CASE_BASED_ADJUSTMENTS', 'REPORTS',
        'AGGR_READ', 'MODELLING', 'BOOTSTRAP'
      ]
    }
  });

  appMgr.uiStateMgr.setActivePageId(4, 0);
  appMgr.caseBasedDataMgr.setUploadProgress(0.6);
  appMgr.aggrDataMgr.setFileUploadProgress(0.6);
  appMgr.adjustMgr.setAdjustmentsRunProgress(true);
  appMgr.modelMgr.setModelsRunProgress(true);
  appMgr.modelMgr.setBootstrapRunProgress(true);
  appMgr.reportMgr.setCreatingReportInProgress(true);
};
