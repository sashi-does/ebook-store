import Book from '../models/Book.js';

// @desc    Get all books with search, filters, pagination, and sorting
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.pageSize) || 8;
    const page = Number(req.query.page) || 1;

    // Build query conditions
    const query = {};

    // Text Search
    if (req.query.keyword) {
      query.$text = { $search: req.query.keyword };
    }

    // Filters
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    if (req.query.author) {
      query.author = { $regex: req.query.author, $options: 'i' };
    }
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }
    if (req.query.rating) {
      query.rating = { $gte: Number(req.query.rating) };
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // Default newest
    if (req.query.sort) {
      if (req.query.sort === 'priceAsc') sortOptions = { price: 1 };
      else if (req.query.sort === 'priceDesc') sortOptions = { price: -1 };
      else if (req.query.sort === 'rating') sortOptions = { rating: -1 };
    }

    const count = await Book.countDocuments(query);
    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Get unique genres for filter options
    const genres = await Book.distinct('genre');

    res.json({
      books,
      page,
      pages: Math.ceil(count / pageSize),
      totalBooks: count,
      genres,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get book details
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = async (req, res, next) => {
  const { title, author, genre, description, ISBN, price, stock, image } = req.body;

  try {
    const bookExists = await Book.findOne({ ISBN });
    if (bookExists) {
      res.status(400);
      throw new Error('A book with this ISBN already exists');
    }

    const book = new Book({
      title,
      author,
      genre,
      description,
      ISBN,
      price,
      stock,
      image,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = async (req, res, next) => {
  const { title, author, genre, description, ISBN, price, stock, image } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;
      book.genre = genre || book.genre;
      book.description = description || book.description;
      book.ISBN = ISBN || book.ISBN;
      book.price = price !== undefined ? price : book.price;
      book.stock = stock !== undefined ? stock : book.stock;
      book.image = image || book.image;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await Book.deleteOne({ _id: book._id });
      res.json({ message: 'Book successfully deleted' });
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    next(error);
  }
};
