import * as z from "zod";

const IMAGE_TYPES = ["image/png", "image/jpg"];
const IMAGE_SIZE_LIMIT = 500_000;

//NOTE: https://zenn.dev/kondo0602/articles/6496b0de8fca72

export const schema = z.object({
  name: z.string().min(1, "氏名は必須です"),
  bio: z.string().min(1, "自己紹介は必須です"),
  profileImage: z
    .custom<FileList>()
    .refine((files) => 0 < files.length, {
      message: "画像ファイルの添付は必須です",
    })
    .refine((files) => 0 < files.length && files.length < 6, {
      message: "添付できる画像ファイルは5枚までです",
    })
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size < IMAGE_SIZE_LIMIT),
      { message: "添付できる画像ファイルは5MBまでです" }
    )
    .refine(
      (files) =>
        Array.from(files).every((file) => IMAGE_TYPES.includes(file.type)),
      { message: "添付できる画像ファイルはjpegかpngです" }
    ),
});

export type FormData = z.infer<typeof schema>;
