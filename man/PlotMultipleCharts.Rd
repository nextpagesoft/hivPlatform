% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/PlotMultipleCharts.R
\name{PlotMultipleCharts}
\alias{PlotMultipleCharts}
\title{PlotMultipleCharts}
\usage{
PlotMultipleCharts(plots, cols = 1, layout = NULL, widths = NULL)
}
\arguments{
\item{plots}{List of ggplot objects. Required.}

\item{cols}{Number of columns. Optional. Default = 1.}

\item{layout}{A matrix specifying layout. If present, \code{cols} is ignored. Optional.
Default = NULL.}

\item{widths}{Vector of column widths. Default = NULL}
}
\value{
NULL (invisibly)
}
\description{
Plot multiple ggplot objects in a grid
}
\examples{
\dontrun{
PlotMultipleCharts(plots)
}

}
