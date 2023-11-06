## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data Structure

The contacts data structure is slightly transformed to optimse the search complexity where a new key (searchIndex) value is added to each object which is particularly useful when you need to filter, sort, or search for data based on multiple criteria simultaneously. This technique is used to speed up the retrieval of data and make queries more efficient.

## Time Complexity of the Search Operation

Big O notation for search functionality is O(n), where 'n' is the number of elements in the contacts array.

The filter function iterates through each element in the contacts array, and for each element, it checks if the searchIndex property contains the value of e.target.value. This involves traversing each element of the array once, resulting in a linear time complexity of O(n), where 'n' is the number of elements in the array.

In the worst case, the entire array may need to be scanned to filter the elements that match the condition.
