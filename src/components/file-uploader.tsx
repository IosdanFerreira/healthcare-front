import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertFileToUrl } from '../../lib/utils';

interface StatusBadgeProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

export default function FileUploader({ files, onChange }: StatusBadgeProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image src={convertFileToUrl(files[0])} width={1000} height={1000} alt="uploaded image" className="max-h-[400px] overflow-hidden object-cover" />
      ) : (
        <>
          <Image src="/assets/icons/upload.svg" width={40} height={40} alt="upload" />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Clique para carregar o arquivos </span>
              ou arraste e solte
            </p>
            <p className="text-12-regular">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
}
