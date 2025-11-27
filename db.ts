import Dexie, { Table } from 'dexie';

export interface Course {
  id?: number;
  name: string;
  code: string;
  instructor: string;
  instructorId: string;
  color: string;
  createdAt: Date;
}

export interface Lecture {
  id?: number;
  courseId: number;
  title: string;
  content: string;
  files: number[]; // file ids
  createdAt: Date;
}

export interface Task {
  id?: number;
  courseId: number;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done';
  progress: number;
  reminders: string[];
  createdAt: Date;
}

export interface FileItem {
  id?: number;
  name: string;
  type: string;
  data: ArrayBuffer;
  createdAt: Date;
}

export interface Settings {
  id?: number;
  apiKey: string;
  apiKeyIv: string;
  theme: string;
  lang: string;
}

export class AppDB extends Dexie {
  courses!: Table<Course>;
  lectures!: Table<Lecture>;
  tasks!: Table<Task>;
  files!: Table<FileItem>;
  settings!: Table<Settings>;

  constructor() {
    super('AwabUniDB');
    this.version(1).stores({
      courses: '++id,name,code,instructor,instructorId,color,createdAt',
      lectures: '++id,courseId,title,createdAt',
      tasks: '++id,courseId,title,dueDate,priority,status,progress,createdAt',
      files: '++id,name,type,createdAt',
      settings: '++id,apiKey,theme,lang'
    });
  }
}

export const db = new AppDB();
