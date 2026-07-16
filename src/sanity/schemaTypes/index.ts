import { post } from './post';
import { category } from './category';
import { author } from './author';
import { testimonial } from './testimonial';
import { niche } from './niche';
import { resourceType } from './resource';
import { resourceCategory } from './resourceCategory';
import { resourceTag } from './resourceTag';
import { faq } from './faq';
import { seo } from './seo';
import { homePage } from './homePage';
import { solutionPage } from './solutionPage';

export const schema = {
  types: [post, category, author, testimonial, niche, resourceType, resourceCategory, resourceTag, faq, seo, homePage, solutionPage],
};

