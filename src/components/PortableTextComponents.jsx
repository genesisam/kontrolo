import React from 'react';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export const components = {
  block: {
    h2: ({ children, value }) => {
      const text = value.children ? value.children.map((child) => child.text).join('') : '';
      return React.createElement('h2', { id: slugify(text) }, children);
    },
    h3: ({ children, value }) => {
      const text = value.children ? value.children.map((child) => child.text).join('') : '';
      return React.createElement('h3', { id: slugify(text) }, children);
    },
  },
};
