export function flyToCart(imageSrc, onComplete) {
  const img = document.createElement("img");

  const cart = document.getElementById("cart-icon");
    cart.classList.add("cart-pop");

    setTimeout(() => {
    cart.classList.remove("cart-pop");
    }, 300);
  img.src = imageSrc;

  img.style.position = "fixed";
  img.style.width = "80px";
  img.style.height = "80px";
  img.style.objectFit = "cover";
  img.style.borderRadius = "12px";
  img.style.zIndex = "9999";
  img.style.transition = "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)";

  document.body.appendChild(img);

  const start = {
    x: window.innerWidth / 2 - 40,
    y: window.innerHeight / 2 - 40,
  };

  img.style.left = `${start.x}px`;
  img.style.top = `${start.y}px`;

  requestAnimationFrame(() => {
    const cart = document.getElementById("cart-icon");

    if (!cart) return;

    const rect = cart.getBoundingClientRect();

    img.style.left = `${rect.left + rect.width / 2 - 20}px`;
    img.style.top = `${rect.top + rect.height / 2 - 20}px`;
    img.style.width = "25px";
    img.style.height = "25px";
    img.style.opacity = "0.7";
  });

  setTimeout(() => {
    img.remove();
    if (onComplete) onComplete();
  }, 750);
}