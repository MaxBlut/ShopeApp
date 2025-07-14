SELECT *
FROM users;
SELECT i.name,
    i.price,
    ci.quantity,
    (i.price * ci.quantity) AS total_price
FROM cart_items ci
    JOIN items i ON ci.item_id = i.id
    JOIN carts c ON ci.cart_id = c.id
WHERE c.user_id = 4;
SELECT *
FROM cart_items