# react-use-Apifetcher

A React hook library for making fetch requests, with optional data processing capabilities.

# Installation

```bash
npm install react-use-apifetcher
```

# Usage

## Basic Fetch Request

```Typescript
import React from 'react';
import { useFetcher } from 'react-use-apifetcher';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SimpleFetchComponent: React.FC = () => {
  const { data: posts, loading, error } = useFetcher<Post[]>('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts?.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleFetchComponent;

```

## Fetch Request with Data Processing

```Typescript
import React from 'react';
import { useFetcher } from 'react-use-apifetcher';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const AdvancedFetchComponent: React.FC = () => {
  const processData = (posts: Post[]) => posts.filter(post => post.userId < 5);

  const { data: filteredPosts, loading, error } = useFetcher<Post[]>('https://jsonplaceholder.typicode.com/posts', {}, processData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Filtered Posts</h1>
      <ul>
        {filteredPosts?.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedFetchComponent;

```

# API

`useFetcher(url, options, callback)`: Fetch data from the given URL. Optionally process the data with a callback.
