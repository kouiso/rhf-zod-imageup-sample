"use client";

import React, { useRef } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type ImageUploadProps<T extends FieldValues> = UseControllerProps<T>;

export const ImageUpload = <T extends FieldValues>({
  control,
  name,
}: ImageUploadProps<T>) => {
  const {
    field: { ref, ...rest },
  } = useController({
    name,
    control,
  });

  const imageUrlRef = useRef<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      imageUrlRef.current = url;
      rest.onChange(e); // Ensure the field value is updated
    }
  };

  return (
    <div className={styles.field}>
      <label>プロフィール画像</label>
      <input
        type="file"
        {...rest}
        ref={(e) => {
          ref(e);
        }}
        onChange={handleImageChange}
      />
      {imageUrlRef.current && (
        <Image
          src={imageUrlRef.current}
          alt="Profile Image"
          width={100}
          height={100}
        />
      )}
    </div>
  );
};
