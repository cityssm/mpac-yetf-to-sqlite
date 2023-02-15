# MPAC YETF to SQLite Database

A command line tool that converts an MPAC Year-End Tax File (YETF)
into a SQLite database file, compatible with reporting tools
like Microsoft Excel and Microsoft Power BI.

The command line tool uses another project from the City of Sault Ste. Marie,
[cityssm/node-mpac-yetf](https://github.com/cityssm/node-mpac-yetf)
to handle the parsing, and simply writes the results to an easier-to-use file.

## Usage

_This application requires Node 14 or better._

    node index --inputFile yetf_2022.txt --outputFile yetf.db
