"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import styles from "./page.module.scss";
import type { FormData } from "./schema"; // type-only import
import { schema } from "./schema";
import { handleFormSubmission } from "./action";
import { ImageUpload } from "./image-upload";
import { useActionState } from "react"; // 修正

export default function Home() {
  const [state, formAction] = useActionState(handleFormSubmission, {
    message: "",
  }); // 修正

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      bio: "",
      ...(state?.fields ?? {}), // 修正
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("bio", data.bio);
      if (data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      await formAction(formData); // 修正
      toast.success("フォームが正常に送信されました！");
    } catch (error) {
      toast.error("フォームの送信に失敗しました。");
      console.error(error);
    }
  };

  const onError = (errors: FieldValues) => {
    toast.error("フォームの送信に失敗しました。");
    console.error(errors);
  };

  return (
    <main className={styles.main}>
      {state?.message !== "" && !state.issues && (
        <div className="text-red-500">{state.message}</div>
      )}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                <X fill="red" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
        <ImageUpload name="profileImage" control={control} />
        <div className={styles.field}>
          <label>氏名</label>
          <input type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={styles.field}>
          <label>自己紹介</label>
          <textarea {...register("bio")} />
          {errors.bio && <p>{errors.bio.message}</p>}
        </div>
        <button type="submit">送信</button>
      </form>
      <Toaster />
    </main>
  );
}
