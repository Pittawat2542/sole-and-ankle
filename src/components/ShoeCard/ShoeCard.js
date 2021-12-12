import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, isNewShoe, pluralize } from '../../utils';

import React from 'react';
import Spacer from '../Spacer';
import styled from 'styled-components/macro';

const ShoeCard = ({
	slug,
	name,
	imageSrc,
	price,
	salePrice,
	releaseDate,
	numOfColors,
}) => {
	// There are 3 variants possible, based on the props:
	//   - new-release
	//   - on-sale
	//   - default
	//
	// Any shoe released in the last month will be considered
	// `new-release`. Any shoe with a `salePrice` will be
	// on-sale. In theory, it is possible for a shoe to be
	// both on-sale and new-release, but in this case, `on-sale`
	// will triumph and be the variant used.
	// prettier-ignore
	const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

	const variantWord = (v) => {
		if (v === 'new-release') return 'Just released!';
		if (v === 'on-sale') return 'Sale';
		return '';
	};

	return (
		<Link href={`/shoe/${slug}`}>
			<Wrapper>
				{variant !== 'default' && (
					<Flag variant={variant}>{variantWord(variant)}</Flag>
				)}
				<ImageWrapper>
					<Image alt='' src={imageSrc} />
				</ImageWrapper>
				<Spacer size={12} />
				<Row>
					<Name>{name}</Name>
					<Price isOnSale={typeof salePrice === 'number'}>
						{formatPrice(price)}
					</Price>
				</Row>
				<Row>
					<ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
					{salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
				</Row>
			</Wrapper>
		</Link>
	);
};

const Link = styled.a`
	text-decoration: none;
	color: inherit;
	flex: 1 1 30%;
	min-width: 340px;
`;

const Wrapper = styled.article`
	position: relative;
	isolation: isolate;
`;

const Flag = styled.div`
	background-color: ${(p) =>
		p.variant === 'new-release' ? COLORS.secondary : COLORS.primary};
	width: max-content;
	padding: 8px;
	color: ${COLORS.white};
	font-weight: ${WEIGHTS.bold};
	position: absolute;
	top: 12px;
	right: -4px;
	z-index: 1;
	border-radius: 2px;
`;

const ImageWrapper = styled.div`
	position: relative;
`;

const Image = styled.img`
	width: 100%;
	border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
	font-size: 1rem;
	display: flex;
	justify-content: space-between;
`;

const Name = styled.h3`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.gray[900]};
`;

const Price = styled.span`
	color: ${(p) => (p.isOnSale ? COLORS.gray[700] : 'inherit')};
	text-decoration: ${(p) => (p.isOnSale ? 'line-through' : 'none')};
`;

const ColorInfo = styled.p`
	color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.primary};
`;

export default ShoeCard;
