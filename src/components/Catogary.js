import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchShoesData } from "../services/fetchShoesData";
import catogaryStyle from "../css/catogarystyle.module.css";
import { Pagination } from "react-bootstrap";

const Catogary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { name } = useParams();
  const { shoes, loading } = useSelector((state) => state.shoes);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const queryPaeams = new URLSearchParams(location.search);
  const searchQuery = queryPaeams.get('search' || '');

  useEffect(() => {
    dispatch(fetchShoesData());
  }, [dispatch]);

  if (loading)
    return (
      <div
        class="spinner-border"
        style={{
          width: "3rem",
          height: "3rem",
          position: "fixed",
          top: "50%",
          left: "50%",
          zIndex: 1000,
        }}
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    );

  const filterShoes = shoes.filter((shoe) => {
    const matchSearch = searchQuery
    ? shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.gender.toLowerCase().includes(searchQuery.toLowerCase())
    : true;

    if (name === "mens")
      return (shoe.gender === "male" || shoe.gender === "unisex") && matchSearch; 
    if (name === "womens")
      return (shoe.gender === "female" || shoe.gender === "unisex") && matchSearch;
    if (name === "unisex") return shoe.gender === "unisex" && matchSearch;
    if (name === "allproducts") return matchSearch;
    return false;
  });

  const sortedShoes = [...filterShoes].sort((a,b) => {
    if (sortOrder === "High to Low"){
      return b.price - a.price;
    }
    else if (sortOrder === "Low to High"){
      return a.price - b.price;
    }
    return 0;
  });

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  
  const shoesToDisplay = sortOrder ? sortedShoes : shuffleArray([...filterShoes]);

  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = shoesToDisplay.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(shoesToDisplay.length / itemsPerPage);
  console.log("total pages =", totalPages);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardDetails = (ID) => {
    navigate(`/Itemdetails/${ID}`);
  };

  const handleOnChange = (e) => {
    setSortOrder(e.target.value);
  }

  return (
    <div
      className="container"
      style={{ maxWidth: "90%", marginTop: "3%", marginBottom: "2%" }}
    >
      <h1>{name.charAt(0).toUpperCase() + name.slice(1)} Shoes</h1>
      {searchQuery ? <p>Showing Results for "{searchQuery || "*"}"</p> : null}

      <h5>Filter</h5>
      <select className="form-select" style={{maxWidth:"10rem"}} value={sortOrder} onChange={handleOnChange}>
        <option value="">Price</option>
        <option value="High to Low">High - Low</option>
        <option value="Low to High">Low - High</option>
      </select>
      <div
        className="d-flex justify-content-center row row-cols-1 row-cols-md-4 g-4"
        style={{ marginTop: "1%", justifyContent:"space-evenly !importent" }}
      >
        {currentItems.map((shoe) => (
          <div key={shoe.id} className={`col ${catogaryStyle["col"]}`}>
            <div 
              className={`card ${catogaryStyle.cardh}`}
              role="button"
              onClick={() => handleCardDetails(shoe.uid)}
            >
              <img
                src={shoe.image}
                alt={shoe.name}
                className={`card-img-top ${catogaryStyle["custom-img"]}`}
              />
              <div className={`card-body ${catogaryStyle["card-body"]}`}>
                <h5 className={`card-title ${catogaryStyle["card-title"]}`}>
                  {shoe.name.length > 30
                    ? shoe.name.slice(0, 30) + "..."
                    : shoe.name}
                </h5>
                <p className={`card-text ${catogaryStyle["card-text"]}`}>{shoe.description.slice(0, 80) + "..."}</p>
                <p className={`card-price ${catogaryStyle["card-price"]}`}>Price: ₹{(shoe.price * 80).toFixed(2)}</p>
                <p className={`card-gender ${catogaryStyle["card-gender"]}`}>{shoe.gender}</p>
                <p className={`${catogaryStyle["card-free-delivery"]}`}>Free Delivery</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentItems.length > 0 ? (<div
        className="d-flex justify-content-center"
        style={{ marginTop: "2%" }}
      >
        <Pagination size="auto" className={`${catogaryStyle["custom-pagination"]}`}>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
              style={{ backgroundColor: "#F6F9FF" }}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>) : (<p><b>No Product is Available for "{searchQuery}"</b></p>)}
    </div>
  );
};

export default Catogary;
