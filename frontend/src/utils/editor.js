export const isEditorContentEmpty = (html = '') => {
  const text = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  return !text;
};
