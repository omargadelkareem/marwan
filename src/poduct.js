import {
  ref,
  push,
  set,
  remove,
  query,
  orderByChild,
  limitToLast,
  endAt,
  get,
  onValue,
} from "firebase/database";
import { db } from "./firebase";

const metaRoot = ref(db, "productsMeta");

// أول صفحة (آخر 15)
export async function fetchProductsPage(pageSize = 15) {
  const q = query(metaRoot, orderByChild("createdAt"), limitToLast(pageSize));
  const snap = await get(q);

  const data = snap.val() || {};
  const items = Object.entries(data)
    .map(([id, item]) => ({ id, ...item }))
    .sort((a, b) => b.createdAt - a.createdAt);

  const lastCursor = items.length ? items[items.length - 1].createdAt : null; // أقدم createdAt في الصفحة
  return { items, lastCursor };
}

// صفحات بعد كده (قبل أو عند cursor)
export async function fetchMoreProductsPage(cursorCreatedAt, pageSize = 15) {
  if (!cursorCreatedAt) return { items: [], lastCursor: null };

  // endAt(cursor-1) لتفادي تكرار آخر عنصر
  const q = query(
    metaRoot,
    orderByChild("createdAt"),
    endAt(cursorCreatedAt - 1),
    limitToLast(pageSize)
  );

  const snap = await get(q);
  const data = snap.val() || {};
  const items = Object.entries(data)
    .map(([id, item]) => ({ id, ...item }))
    .sort((a, b) => b.createdAt - a.createdAt);

  const lastCursor = items.length ? items[items.length - 1].createdAt : null;
  return { items, lastCursor };
}

export async function addProduct(product) {
  const newRef = push(metaRoot);
  const id = newRef.key;
  const createdAt = Date.now();

  // meta (خفيف)
  await set(ref(db, `productsMeta/${id}`), {
    name: product.name,
    price: product.price,
    thumbBase64: product.thumbBase64,
    createdAt,
  });

  

  // full image في مكان منفصل
  await set(ref(db, `productImages/${id}`), {
    fullBase64: product.fullBase64,
  });
}

export async function deleteProduct(id) {
  await remove(ref(db, `productsMeta/${id}`));
  await remove(ref(db, `productImages/${id}`));
}


export function listenToProducts(callback) {
  const q = query(metaRoot, orderByChild("createdAt"), limitToLast(300));
  return onValue(q, (snapshot) => {
    const data = snapshot.val() || {};
    const items = Object.entries(data)
      .map(([id, item]) => ({ id, ...item }))
      .sort((a, b) => b.createdAt - a.createdAt);

    callback(items);
  });
}