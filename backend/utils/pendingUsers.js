// pendingUsers.js
const pendingUsers = new Map();

function addPendingUser(email, data) {
  pendingUsers.set(email, {
    ...data,
    createdAt: Date.now(),
  });

  // Xóa sau 15 phút
  setTimeout(() => pendingUsers.delete(email), 15 * 60 * 1000);
}

function getPendingUser(email) {
  return pendingUsers.get(email);
}

function removePendingUser(email) {
  pendingUsers.delete(email);
}

export {
  addPendingUser,
  getPendingUser,
  removePendingUser,
};