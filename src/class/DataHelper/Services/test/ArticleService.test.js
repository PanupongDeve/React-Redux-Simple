import ArticleService from '../ArticleService';

describe('ArticleServices Testing',() => {
   
    test('can get articles', async () => {
        const articles = await  ArticleService.getArticles();
        console.log(articles);
        expect(typeof articles).toBe("object");
    });
  
    test('can get article', async () => {
        const article = await ArticleService.getArticle(1);
        console.log(article);
        expect(typeof article).toBe("object");
    });
  });