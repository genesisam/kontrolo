import { post } from './post';
import { category } from './category';
import { author } from './author';
import { testimonial } from './testimonial';
import { niche } from './niche';
import { resourceType } from './resource';

export const schema = {
  types: [post, category, author, testimonial, niche, resourceType],
};
