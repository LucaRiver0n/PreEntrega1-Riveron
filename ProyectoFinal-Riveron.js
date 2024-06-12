const { useState, useEffect } = React;

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addProduct = (e) => {
    e.preventDefault();
    const isValidPrice = /^[1-9]\d{0,3}$/.test(newProduct.price);
    if (isValidPrice) {
      const product = { ...newProduct, id: products.length + 1 };
      setProducts([...products, product]);
      setFilteredProducts([...filteredProducts, product]);
      setNewProduct({ name: '', price: '', description: '', image: '' });
      setIsModalOpen(false);
    } else {
      alert('Por favor ingrese un precio válido (1-9999).');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const sortProducts = (order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    setFilteredProducts(sortedProducts);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  return (
    <div className="container">
      <h1>Tienda de Ropa</h1>
      <div className="filters">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todas las Categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div>
          <button onClick={() => sortProducts('asc')}>Precio Ascendente</button>
          <button onClick={() => sortProducts('desc')}>Precio Descendente</button>
        </div>
      </div>
      <ul className="product-list">
        {filteredProducts.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} width="50" height="50" />
            <div className="product-details">
              <h2>{product.title}</h2>
              <p>{product.description.split(' ').slice(0, 50).join(' ')}{product.description.split(' ').length > 50 ? '...' : ''}</p>
              <span>${product.price}</span>
              <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="add-product-button" onClick={() => setIsModalOpen(true)}>Agregar Producto</button>
      <div className="cart">
        <h2>Carrito de Compras</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.title} - ${item.price} <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
        <p>Total: ${calculateTotal()}</p>
      </div>
      {isModalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <h2>Agregar Nuevo Producto</h2>
            <form onSubmit={addProduct}>
              <input
                type="text"
                name="name"
                placeholder="Nombre del Producto"
                value={newProduct.name}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Precio"
                min="1"
                max="9999"
                value={newProduct.price}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={newProduct.description}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="image"
                placeholder="URL de la Imagen"
                value={newProduct.image}
                onChange={handleInputChange}
              />
              <button type="submit">Agregar Producto</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
