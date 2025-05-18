const pendingForgot = []; // danh sách email đang chờ xử lý quên mật khẩu

const addPendingForgot = (email) => {
  if (!pendingForgot.includes(email)) {
    pendingForgot.push(email);
    setTimeout(() => removePendingForgot(email), 15 * 60 * 1000); // tự xóa sau 15 phút
  }
};

const getPendingForgot = (email) => {
  return pendingForgot.find(e => e === email); // trả về email nếu có
};

const removePendingForgot = (email) => {
  const index = pendingForgot.indexOf(email);
  if (index !== -1) {
    pendingForgot.splice(index, 1);
  }
};

export {
  addPendingForgot,
  getPendingForgot,
  removePendingForgot,
};
