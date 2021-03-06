import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

import '../styles/review-card.scss';

export interface ReviewProps {
  avatar: string;
  author: string;
  content: string;
}

export class ReviewCard extends React.Component<ReviewProps, {}> {
  render() {
    const { avatar, author, content } = this.props;
    return (
      <div className="review--wrapper has-border has-box-shadow m-b-15">
        <div className="review__avatar--wrapper">
          <div className="review__avatar has-cursor round">{avatar}</div>
        </div>
        <div className="review__content">
          <div className="text-md text-black mb-2 p-t-10 p-b-10">
            A review by<span className="text-bold has-cursor"> {author}</span>
          </div>
          <div className="text-md p-t-10 p-b-10 text-black"><ReactMarkdown source={content} /></div>
        </div>
      </div>
    );
  }
}
