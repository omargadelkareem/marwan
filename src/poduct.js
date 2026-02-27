import { onValue, orderByChild, push, query, ref, remove, set } from "firebase/database";
import { db } from "./firebase";

const productsRef = ref(db, "products");

export function listenToProducts(callback) {
  const q = query(productsRef, orderByChild("createdAt"));

  return onValue(q, (snapshot) => {
    const data = snapshot.val() || {};

    const items = Object.entries(data)
      .map(([id, item]) => ({ id, ...item }))
      .sort((a, b) => b.createdAt - a.createdAt);

    callback(items);
  });
}

export async function addProduct(product) {
  const newRef = push(productsRef);
  await set(newRef, {
    ...product,
    createdAt: Date.now(),
  });
}

export async function deleteProduct(id) {
  await remove(ref(db, `products/${id}`));
}