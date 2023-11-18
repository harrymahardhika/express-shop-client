type User = {
  id: number
  name: string
  email: string
}

type Product = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  categories: Category[] | null
}

type Category = {
  id: number
  name: string
  description: string
}

type Order = {
  id: number
  total: number
  status: string
  number: string
  createdAt: string
  items: OrderItem[]
}

type OrderItem = {
  id: number
  quantity: number
  total: number
  product: Product
}

type Cart = {
  id: number
  productId: number
  quantity: number
  total: number
  product: Product
}
type Meta = {
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: number | null
  previousPage: number | null
}
