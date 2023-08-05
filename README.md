# 1. ERD

![](https://velog.velcdn.com/images/kinjoo/post/598b3ea9-e54f-40c7-b9e3-ec8f47da3269/image.png)

# 2. API 명세서

#### 1) Items

- 상품 추가 POST api/items
- 상품 전체 조회 GET api/items
- 상품 삭제 1차 DELETE api/items/:id
- 상품 삭제 2차 DELETE api/answer/items/:id
- 상품 수정 PUT api/items/:id

#### 2) OrderItems

- 상품 발주 POST api/items/:itemId/orderItems
- 발주 상태 수정 PUT api/items/:itemId/orderItems/:id

#### 3) OrderCustomers

- 상품 주문 POST api/orderCustomers
- 상품 주문 수정 PUT api/orderCustomers/:orderCustomerId

#### 4) Options

- 옵션 추가 POST api/options
- 옵션 삭제 DELETE api/options/:id
