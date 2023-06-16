import React, { useRef } from 'react'
import { Field, FieldInputProps, useField} from 'formik'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'
import { Editor as TinyMCEEditor } from 'tinymce';
import { Editor } from '@tinymce/tinymce-react'
import { endpoints } from 'service/apiEndpoints'


import getConfig from 'next/config'
import { apiClient } from 'service/apiClient'
import { getSession } from 'next-auth/react'

const { publicRuntimeConfig } = getConfig()

export type RegisterFormProps = {
  name: string
}


const image_upload_handler = (blobInfo:any, progress:any) : Promise<string> => new Promise(async(resolve, reject) => {
    const session = await getSession();
    if(!session || !session.accessToken) {reject('Unauthorized'); return}
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.fileName)
    const response = await apiClient.post(endpoints.campaign.imageUpload.url, formData, {headers: { Authorization: `Bearer ${session.accessToken}` }});
    if(!response) reject("Oops something went wrong")

    resolve(`${publicRuntimeConfig.API_URL}/${response.data}`)  
}) 

export default function FormRichTextField({ name }: RegisterFormProps) {
  const { t } = useTranslation()
  const [, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

   const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <>
      {meta.touched && meta.error && (
        <Typography className="error" color="red">
          {helperText}
        </Typography>
      )}    
      <Field name={name}>
        {({ field }: { field: FieldInputProps<string> }) => (
      <Editor
        tinymceScriptSrc={publicRuntimeConfig.APP_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => editorRef.current = editor}
        onEditorChange={(event) => field.onChange({target: {name, value:event}})}
        value={field.value}
        init={{
          height: 500,
          menubar: true,
          promotion: false,
          branding: false,
          content_css_cors: true,         
          referrer_policy: 'unsafe-url',
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help',
          ],
          editimage_cors_hosts: [ 'localhost:5010'],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | image', 
            
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          images_upload_handler: image_upload_handler,
        }}
      />
        )}
      </Field>
    </>
  )
}