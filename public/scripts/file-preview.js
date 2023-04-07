const filePickerElement = document.getElementById('image');
const imagePreviewElement = document.getElementById('image-preview');

const showPreview = () => {
  const files = filePickerElement.files;
  if(!files || files.length === 0){
    imagePreviewElement.style.display = 'none';
    return; // file 없으면 바로 종료
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = 'block';
}

filePickerElement.addEventListener('change',showPreview);