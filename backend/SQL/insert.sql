-- Insert sample items
INSERT INTO items (name, price, image_url)
VALUES ('Mouse', 19.99, 'images/mouse.jpg'),
    (
        'Toaster',
        49.90,
        'images/toaster.webp'
    ),
    (
        'Headset',
        59.00,
        'images/headset.jpg'
    ),
    (
        'Keyboard',
        69.00,
        'images/keybord.jpg'
    ),
    (
        'Wire-less headset',
        159.95,
        'images/wireless_headset.jpg'
    );
INSERT INTO users (email, password_hash)
VALUES (
        'azertyuiop',
        /*correspond to the passeword "Azertyuiop"*/
        '$2b$10$Ep7wHcPgbcIsfi5ZQ2SB3eBSnWfTIL/UD9aZ3NB.RG7OxTs74RB6W'
    ),
    ('bob@example.com', 'anotherhash456'),
    ('charlie@example.com', 'yetanotherhash789');
-- Create a cart for Alice (user_id = 1)
INSERT INTO carts (user_id)
VALUES (1);
-- Add items to Alice's cart (cart_id = 1)
INSERT INTO cart_items (cart_id, item_id, quantity)
VALUES (1, 1, 2),
    (1, 3, 1),
    (1, 4, 1);