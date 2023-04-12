//! 產生隨機網址
function generateShortUrl() {
  const ObjectId = mongoose.Types.ObjectId;
  const id = new ObjectId();
  return id.toString().substring(0, 8);
}
