export interface PostQuestionParam {
  title: string;
  content: string;
  tags: string[];
  isAnonymous?: boolean; //匿名
  images?: string[]; //图片
}
