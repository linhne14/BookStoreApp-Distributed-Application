import Paginate from '../components/Paginate';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import { Col, Row, Container } from 'react-bootstrap';
import { listProductsAction } from '../actions/productActions';
import FullPageLoader from '../components/FullPageLoader';
import ReactPaginate from 'react-paginate';
import HeroSection from '../components/HeroSection';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pageResponse } = productList;

  useEffect(() => {
    dispatch(listProductsAction(0));
  }, [dispatch]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    dispatch(listProductsAction(selected));
  };

  return (
    <div style={{padding: 0, margin: 0, width: '100%'}}>
      {/* Hero Section - Full Screen */}
      <HeroSection />
      
      {/* Products Section */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold" style={{color: '#ff5722'}}>Latest Fashion Collection</h1>
          <p className="lead text-muted">Discover our curated selection of premium clothing and accessories</p>
        </div>
        
        {error ? (
          <Message variant='danger'></Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product.productId} sm={12} md={6} lg={4} xl={3} className="mb-4">
                  <Product key={product.productId} product={product}></Product>
                </Col>
              ))}
            </Row>
            {/* Pagination */}
            <Row className='m-5 justify-content-md-center'>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageResponse?.totalPages}
                marginPagesDisplayed={50}
                pageRangeDisplayed={10}
                onPageChange={(e) => handlePageClick(e)}
                containerClassName={'pagination'}
                activeClassName={'page-item active'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-link'}
                nextClassName={'page-link'}
              />
            </Row>
          </>
        )}
        {loading && <FullPageLoader></FullPageLoader>}
      </Container>
    </div>
  );
};

export default HomeScreen;
