/** The Task type used on the client, used undefined instead of null */
export type ClientTask = {
  createdAt: Date;
  description?: string;
  id: number;
  isBlocked: boolean;
  isDone: boolean;
  isImportant?: boolean;
  isUrgent?: boolean;
  title: string;
};

export type ServerTask = ClientTask & {
  description: string | null;
  isImportant: boolean | null;
  isUrgent: boolean | null;

  // These fields are not used on the client
  createdById: string;
  updatedAt: Date;
};
