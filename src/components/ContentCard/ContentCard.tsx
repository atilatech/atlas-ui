import { Content } from '../../models/Content';
import { Utils } from '../../services/Utils';

export interface ContentCardProps {
    content: Content;
};

export function ContentCard(props: ContentCardProps) {

    const { content } = props;

    return (
        <div className="ContentCard card shadow my-3 p-3">
            <a className="text-align-left" href={content.url} target="_blank" rel="noopener noreferrer">
                {content.name} <br />
                {content.img_url &&
                    <img src={content.img_url} width="150"
                        alt={content.name} />}
            </a>
            <p>{Utils.truncateText(content.description!, 140)} </p>
        </div>
    );
}