import { Article } from '../../../types/api';
import './news.css';

class News {
    draw(data: readonly Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector('.news__item');

            if (!newsItem) return;

            if (idx % 2) newsItem.classList.add('alt');

            const newsPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');

            if (!newsPhoto) return;

            const newsAuthor = newsClone.querySelector('.news__meta-author');

            if (!newsAuthor) return;

            const newsDate = newsClone.querySelector('.news__meta-date');

            if (!newsDate) return;

            newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsAuthor.textContent = item.author || item.source.name;
            newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescrTitle = newsClone.querySelector('.news__description-title');
            const newsDescrSource = newsClone.querySelector('.news__description-source');
            const newsDescrContent = newsClone.querySelector('.news__description-content');
            const newsDescrReadMore = newsClone.querySelector('.news__read-more a');

            if (!newsDescrTitle) return;
            if (!newsDescrSource) return;
            if (!newsDescrContent) return;
            if (!newsDescrReadMore) return;

            newsDescrTitle.textContent = item.title;
            newsDescrSource.textContent = item.source.name;
            newsDescrContent.textContent = item.description;
            newsDescrReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement = document.querySelector('.news');

        if (!newsElement) return;

        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
