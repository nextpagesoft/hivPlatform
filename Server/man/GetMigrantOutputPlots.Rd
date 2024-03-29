% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/GetMigrantOutputPlots.R
\name{GetMigrantOutputPlots}
\alias{GetMigrantOutputPlots}
\title{GetMigrantOutputPlots}
\usage{
GetMigrantOutputPlots(data, ...)
}
\arguments{
\item{data}{data}

\item{...}{Additional arugmnents passed to \code{\link{GetMigrantConfBounds}}}
}
\value{
list
}
\description{
Get migrant output plots data
}
\examples{
\dontrun{
GetMigrantOutputPlots(
  data,
  strat = c(),
  region = 'ALL',
  regionColumn = 'MigrantRegionOfOrigin',
  minPresentRatio = 0.9,
  detailed = FALSE
)
}

}
