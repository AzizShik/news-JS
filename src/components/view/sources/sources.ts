import { Source } from '../../../types/api';
import './sources.css';

type SourceItem = Pick<Source, 'id' | 'name'>;

class Sources {
    draw(data: readonly SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameElement = sourceClone.querySelector('.source__item-name');

            if (nameElement) nameElement.textContent = item.name;

            const idElement = sourceClone.querySelector('.source__item');

            if (idElement) idElement.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesElement = document.querySelector('.sources');

        if (sourcesElement) sourcesElement.append(fragment);
    }
}

export default Sources;
