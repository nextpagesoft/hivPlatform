#' ApplyGrouping
#'
#' Applies grouping map to the input data
#'
#' @param data Data. Required.
#' @param originGrouping List object with mapping. Required.
#' @param from Column name for mapping from
#' @param to Column name for mapping to
#'
#' @return inputData
#'
#' @examples
#' \dontrun{
#' ApplyGrouping(
#'   inputData,
#'   originGrouping,
#'   from = 'FullRegionOfOrigin',
#'   to = 'GroupedRegionOfOrigin'
#' )
#' }
#'
#' @export
ApplyGrouping <- function(
  data,
  originGrouping,
  from = 'FullRegionOfOrigin',
  to = 'GroupedRegionOfOrigin'
) {
  if (to %in% colnames(data)) {
    data[, (to) := NULL]
  }

  data[is.na(get(from)), (from) := 'UNK']
  if (length(originGrouping) > 0) {
    cols <- c(from, to)
    dtMap <- unique(ConvertListToDt(originGrouping)[, ..cols])
    data[
      dtMap,
      (to) := get(to),
      on = from
    ]
  } else {
    data[, (to) := NA_character_]
  }
  data[get(to) == 'UNK', (to) := NA_character_]
  data[get(from) == 'UNK', (from) := NA_character_]

  return(invisible(data))
}