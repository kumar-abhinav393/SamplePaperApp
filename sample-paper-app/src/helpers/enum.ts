enum TimeFilter {
  All = "all",
  Recent = "recent",
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

enum Subjects {
  PHYSICS = "PHYSICS",
  ENGLISH = "ENGLISH",
  MATHS = "MATHS",
  SST = "SST"
}

enum Boards {
  CBSE = "CBSE",
  ICSE = "ICSE",
}

enum Papers {
  ASSIGNMENT = "ASSIGNMENT",
  QUESTION_PAPER = "QUESTION_PAPER"
}

export {TimeFilter, SortOrder, ColorMode, UserRole, Subjects, Boards, Papers}