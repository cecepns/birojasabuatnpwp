import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean'],
];

const MODULES = {
  toolbar: TOOLBAR,
};

const FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
];

export default function RichTextEditor({ value, onChange, placeholder = 'Tulis konten artikel...' }) {
  return (
    <div className="rich-text-editor rounded-xl border border-slate-200 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={MODULES}
        formats={FORMATS}
        placeholder={placeholder}
      />
    </div>
  );
}
