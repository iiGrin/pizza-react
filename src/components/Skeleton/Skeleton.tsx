import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="132" cy="124" r="124" />
    <rect x="15" y="430" rx="10" ry="10" width="80" height="27" />
    <rect x="116" y="421" rx="25" ry="25" width="150" height="46" />
    <rect x="15" y="310" rx="10" ry="10" width="250" height="82" />
    <rect x="15" y="260" rx="0" ry="0" width="250" height="22" />
  </ContentLoader>
);
