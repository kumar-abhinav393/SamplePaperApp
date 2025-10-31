enum TimeFilter {
  All = "all",
  Upcoming = "upcoming",
  LastMonth = "lastMonth",
  ThisMonth = "thisMonth",
}

enum SortOrder {
    asc = "asc",
    desc = "desc",
}

enum ColorMode {
    black = "black",
    white = "white",
}

enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
  FACULTY = "faculty"
}

export {TimeFilter, SortOrder, ColorMode, UserRole}