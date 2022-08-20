export default function TagRemover(text) {
  if (text === null || text === "") {
    return false;
  }
  return text.toString().replace(/(<([^>]+)>)/gi, "");
}
