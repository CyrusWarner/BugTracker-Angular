export interface NewBoard {
  title: string,
  description: string
}

export interface Board {
  boardId: number,
  title: string,
  description: string
}

export interface UserBoard {
  userId: number,
  boardId: number,
  rolesId: number,
  inviteAccepted: boolean,
  board: Board
}
