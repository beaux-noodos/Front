import React, {useState} from "react";
import {Input} from "antd";

export interface ImageUploadProps {
    onUpload(image: File): void;
    defaultUri?: string;
    uploadText?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({onUpload, defaultUri = "", uploadText,}) => {

    const [preview, setPreview] = useState(defaultUri);

    const _onUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = ev.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList.item(0)!;
            onUpload(file);
            setPreview(URL.createObjectURL(file));
        }
        ev.target.value = "";
    };

    return (
        <>
            <Input
                onChange={_onUpload}
                id="ImageUploadInput"
                className="hidden"
                type="file"
            />
            <label
                data-testid="image-upload"
                htmlFor="ImageUploadInput"
            >
                {preview ? (
                    <img src={preview} className="h-full w-full" alt="preview-image"/>
                ) : (
                    <div className="flex h-40 w-full items-center justify-center">
                        {uploadText || "Upload an image"}
                    </div>
                )}
            </label>
        </>
    );
};