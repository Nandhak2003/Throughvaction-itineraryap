import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import type {
  HotelItem,
  ItineraryActivity,
  ItineraryDay,
  ItineraryEntry,
  ItineraryTransfer,
  QuotationData,
  SightseeingItem,
} from '../types/quotation';

type QuotationPDFProps = {
  data: QuotationData;
};

const styles = StyleSheet.create({
  page: {
    size: 'A4',
    fontSize: 8.7,
    fontFamily: 'Helvetica',
    color: '#1f2937',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    lineHeight: 1.32,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    width: '70%',
    gap: 8,
  },
  logo: {
    width: 58,
    height: 58,
    objectFit: 'contain',
    borderRadius: 3,
  },
  companyWrap: {
    gap: 2,
  },
  companyName: {
    marginTop:9,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom:3,
  },
  companyAddress: {
    fontSize: 10,
    color: '#4b5563',
  },
  headerRight: {
    width: '30%',
    alignItems: 'flex-end',
    gap: 2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactIcon: {
    width: 16,
    height: 16,
    objectFit: 'contain',
  },
  contactText: {
    color: '#2f4b8f',
    fontSize: 10,
  },
  headerRule: {
    borderBottom: '4 solid #296182',
    marginBottom: 10,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 9,
  },
  tripLeft: {
    width: '62%',
  },
  tripRight: {
    width: '36%',
  },
  tripTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  tripSubtitle: {
    color: '#4b5563',
    fontSize: 10.5,
  },
  rightMeta: {
    width: '100%',
    alignItems: 'flex-end',
    color: '#4b5563',
    fontSize: 8.5,
    lineHeight: 1.3,
    gap: 2,
  },
  sectionHeading: {
    fontSize: 10,
    // fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
    fontWeight:'Bold',
  },
  thinBlueRule: {
    borderBottom: '1 solid #296182',
    marginBottom: 6,
  },
  dashedRule: {
    borderBottom: '0.5 solid #272829',
    marginVertical: 7,
  },
  dottedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginBottom: 7,
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 1,
    backgroundColor: '#b6bcc6',
  },
  inclusionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 15,
  },
  inclusionCol: {
    width: '48%',
    gap: 2,
  },
  inclusionText: {
    color: '#374151',
    fontSize: 9,
    fontWeight: 500,
    marginBottom: 6,
  },
  totalPriceRow: {
    backgroundColor: '#eef2fa',
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 20,
    marginbottom:50,
  },
  totalLeft: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
  },
  totalRight: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
  },
  guestLine: {
    marginBottom: 5,
  },
  hotelCard: {
    flexDirection: 'column',
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  hotelTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  hotelLeft: {
    width: '78%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  hotelImage: {
    width: 48,
    height: 44,
    objectFit: 'cover',
    borderRadius: 2,
  },
  hotelBody: {
    gap: 1.2,
    flexGrow: 1,
    flexShrink: 1,
  },
  hotelMetaBlock: {
    marginTop: 9,
    marginLeft: 1,
    marginBottom: 10,
  },
  hotelMetaLine: {
    marginBottom: 1,
    lineHeight: 0.8,
  },
  hotelName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  
  hotelStars: {
    flexDirection: 'row',
    gap: 1,
    marginBottom: 1,
  },
  hotelStarIcon: {
    width: 12,
    height: 12,
    objectFit: 'contain',
    backgroundColor: '#ffffff',
    marginTop:3,
  },
  hotelCity: {
    color: '#9aa3b2',
    fontSize: 8,
    fontWeight: 'Bold',
  },
  hotelCityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 1,
    marginTop:2,
  },
  hotelLocationIcon: {
    width: 12,
    height: 12,
    objectFit: 'contain',
  },
  hotelMeta: {
    color: '#9aa3b2',
    fontSize: 8,
    fontWeight: 600,
  },
  hotelMetaValue: {
    color: '#111827',
    fontSize: 7.8,
    fontWeight: 500,
  },
  hotelRight: {
    width: '20%',
    alignItems: 'flex-end',
    color: '#6b7280',
    fontSize: 7.9,
    gap: 1,
    paddingTop: 0,
  },
  sightRow: {
    borderBottom: '1 solid #d1d5db',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sightText: {
    fontSize: 8.3,
    color: '#374151',
  },
  badge: {
    border: '1 solid #8fa2cc',
    backgroundColor: '#f4f7fd',
    minWidth: 70,
    height: 20,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#4e5d89',
    textAlign: 'center',
    fontSize: 7.5,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  dayHeader: {
    marginTop: 6,
    color: '#667085',
    fontWeight: 600,
    fontSize: 8.5,
  },
  itineraryHeading: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },
  itemTitleRow: {
    marginTop: 5,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 9,
    fontWeight: 700,
    width: '100%',
  },
  logoFallback: {
    width: 54,
    height: 54,
    borderRadius: 2,
    backgroundColor: '#2f4b8f',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  inclusionRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  inclusionIcon: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inclusionIconText: {
    fontSize: 6,
    color: '#6b7280',
  },
  inclusionIconImage: {
    width: 10,
    height: 10,
    borderRadius: 2,
    objectFit: 'cover',
  },
  transferRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  transferCol: {
    width: '49%',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  transferIcon: {
    width: 15,
    height: 15,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transferIconText: {
    fontSize: 7,
    fontWeight: 'bold',
  },
  transferKey: {
    fontWeight: 'bold',
  },
  itemDescription: {
    color: '#6b7280',
    fontSize: 9,
    lineHeight: 1.35,
    marginBottom: 5,
    marginTop:5,
  },
  termsHeading: {
    marginTop: 3,
    marginBottom: 6,
    color: '#6b7280',
    fontSize: 9,
    fontWeight: 'bold',
  },
  termItem: {
    color: '#6b7280',
    fontSize: 8.8,
    marginBottom: 1,
  },
  imageRow: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 6,
  },
  activityImage: {
    width: 70,
    height: 50,
    objectFit: 'cover',
    borderRadius: 2,
  },
  appBanner: {
    marginTop: 10,
    backgroundColor: '#dce8f5',
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 12,
    gap: 3,
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  appBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  appBadge: {
    width: 60,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  appBadgeTextTop: {
    color: '#e2e8f0',
    fontSize: 6,
  },
  appBadgeTextBottom: {
    color: '#ffffff',
    fontSize: 7,
    fontWeight: 'bold',
  },
  appTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2b436f',
  },
  appIcon: {
    width: 18,
    height: 18,
    borderRadius: 4,
    objectFit: 'cover',
  },
  appSub: {
    color: '#50668f',
  },
  footerContact: {
    marginTop: 8,
    borderTop: '1 solid #d1d5db',
    paddingTop: 8,
  },
  thankYouBar: {
    marginTop: 8,
    backgroundColor: '#2f4b8f',
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 6,
    fontWeight: 'bold',
  },
});

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const parseJson = <T,>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const splitColumns = (list: string[]) => {
  const half = Math.ceil(list.length / 2);
  return [list.slice(0, half), list.slice(half)];
};

const truncate = (value: string, max = 62) =>
  value.length > max ? `${value.slice(0, max - 3)}...` : value;

const emptyStringArray: string[] = [];

const toBase64Utf8 = (value: string) => {
  if (typeof globalThis.btoa === 'function') {
    return globalThis.btoa(unescape(encodeURIComponent(value)));
  }
  const g = globalThis as { Buffer?: { from: (input: string, encoding: string) => { toString: (encoding: string) => string } } };
  if (g.Buffer) {
    return g.Buffer.from(value, 'utf8').toString('base64');
  }
  return value;
};

const normalizeImageSrc = (src: string) => {
  if (!src) return src;
  const svgUtf8Prefix = 'data:image/svg+xml;utf8,';
  if (src.startsWith(svgUtf8Prefix)) {
    const encoded = src.slice(svgUtf8Prefix.length);
    const rawSvg = decodeURIComponent(encoded);
    return `data:image/svg+xml;base64,${toBase64Utf8(rawSvg)}`;
  }
  return src;
};

const svgPlaceholder = (label: string, bg = '#e2e8f0') =>
  `data:image/svg+xml;base64,${toBase64Utf8(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="150">
      <rect width='100%' height='100%' fill='${bg}' />
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-family='Helvetica' font-size='16' fill='#1f2937'>${label}</text>
    </svg>`,
  )}`;

const companyInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const hotelFallbackImage = (name: string) =>
  svgPlaceholder(name.trim() || 'Hotel', '#eef2ff');

const activityPlaceholder = (label: string) =>
  svgPlaceholder(label, '#f1f5f9');

const renderSegmentedRule = (keyPrefix: string, dashCount = 65) => (
  <View key={`${keyPrefix}-row`} style={styles.dottedRow}>
    {Array.from({ length: dashCount }).map((_, i) => (
      <View key={`${keyPrefix}-dot-${i}`} style={styles.dot} />
    ))}
  </View>
);

const renderEntry = (
  entry: ItineraryEntry,
  index: number,
  pickupIconUrl?: string,
  dropIconUrl?: string,
) => {
  if (entry.type === 'transfer') {
    const transfer = entry as ItineraryTransfer;
    return (
      <View key={`entry-${index}`}>
        <View style={styles.itemTitleRow}>
          <Text style={styles.itemTitle}>
            {transfer.title} | {transfer.mode}
          </Text>
        </View>
        <View style={styles.transferRow}>
          <View style={styles.transferCol}>
            {pickupIconUrl ? (
              <Image src={normalizeImageSrc(pickupIconUrl)} style={styles.transferIcon} />
            ) : (
              <View style={[styles.transferIcon, { backgroundColor: '#e6f0ff' }]}>
                <Text style={[styles.transferIconText, { color: '#2563eb' }]}>P</Text>
              </View>
            )}
            <Text>
              <Text style={styles.transferKey}>Pickup from:</Text> {transfer.pickup}
            </Text>
          </View>
          <View style={styles.transferCol}>
            {dropIconUrl ? (
              <Image src={normalizeImageSrc(dropIconUrl)} style={styles.transferIcon} />
            ) : (
              <View style={[styles.transferIcon, { backgroundColor: '#ffe4e6' }]}>
                <Text style={[styles.transferIconText, { color: '#be123c' }]}>D</Text>
              </View>
            )}
            <Text>
              <Text style={styles.transferKey}>Drop at:</Text> {transfer.drop}
            </Text>
          </View>
        </View>
        <Text style={styles.itemDescription}>{transfer.route}</Text>
      </View>
    );
  }

  const activity = entry as ItineraryActivity;
  return (
    <View key={`entry-${index}`}>
      <View style={styles.itemTitleRow}>
        <Text style={styles.itemTitle}>
          {activity.title} | {activity.mode}
        </Text>
      </View>
      <Text style={styles.itemDescription}>{activity.description}</Text>
      {activity.terms?.length ? (
        <View>
          <Text style={styles.termsHeading}>Terms and Conditions</Text>
          {activity.terms.map((term, termIndex) => (
            <Text key={`term-${termIndex}`} style={styles.termItem}>
              {termIndex + 1}. {term}
            </Text>
          ))}
        </View>
      ) : null}
      <View style={styles.imageRow}>
        {(activity.images?.length
          ? activity.images
          : emptyStringArray.concat([
              activityPlaceholder('Image 1'),
              activityPlaceholder('Image 2'),
              activityPlaceholder('Image 3'),
              activityPlaceholder('Image 4'),
              activityPlaceholder('Image 5'),
            ])
        )
          .slice(0, 5)
          .map((src, imageIndex) => (
          <Image key={`img-${imageIndex}`} src={normalizeImageSrc(src)} style={styles.activityImage} />
        ))}
      </View>
    </View>
  );
};

function QuotationPDF({ data }: QuotationPDFProps) {
  const inclusions = parseLines(data.inclusions);
  const guests = parseLines(data.guests);
  const hotels = parseJson<HotelItem[]>(data.hotelsJson, []);
  const sightseeing = parseJson<SightseeingItem[]>(data.sightseeingJson, []);
  const itineraryDays = parseJson<ItineraryDay[]>(data.itineraryJson, []);
  const hasGuests = guests.length > 0;
  const hasHotels = hotels.length > 0;
  const hasSightseeing = sightseeing.length > 0;
  const hasItinerary = itineraryDays.length > 0;
  const inclusionIcons = parseJson<Array<{ name: string; icon: string }>>(data.inclusionIconsJson, []);
  const [leftInclusions, rightInclusions] = splitColumns(inclusions);
  const findInclusionIcon = (text: string) => {
    const lower = text.toLowerCase();
    const hit = inclusionIcons.find((ii) => (ii?.name || '').toLowerCase() && lower.includes(ii.name.toLowerCase()));
    return hit?.icon;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            {data.logoDataUrl ? (
              <Image src={normalizeImageSrc(data.logoDataUrl)} style={styles.logo} />
            ) : (
              <Text style={styles.logoFallback}>{companyInitials(data.companyName) || 'TV'}</Text>
            )}
            <View style={styles.companyWrap}>
              <Text style={styles.companyName}>{data.companyName}</Text>
              <Text style={styles.companyAddress}>{data.companyAddress}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.contactRow}>
              <Image src="/image/phone.png" style={styles.contactIcon} />
              <Text style={styles.contactText}>{data.companyPhone}</Text>
            </View>
            <View style={styles.contactRow}>
              <Image src="/image/mail.png" style={styles.contactIcon} />
              <Text style={styles.contactText}>{data.companyEmail}</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRule} />

        <View style={styles.tripHeader}>
          <View style={styles.tripLeft}>
            <Text style={styles.tripTitle}>{data.tripTitle}</Text>
            <Text style={styles.tripSubtitle}>{data.tripSubtitle}</Text>
          </View>
          <View style={[styles.rightMeta, styles.tripRight]}>
            <Text>Travel Date - {data.travelDate}</Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>Inclusions:</Text>
        <View style={styles.inclusionsGrid}>
          <View style={styles.inclusionCol}>
            {leftInclusions.map((item, index) => (
              <View key={`left-${index}`} style={styles.inclusionRow}>
                {findInclusionIcon(item) ? (
                  <Image src={normalizeImageSrc(findInclusionIcon(item) as string)} style={styles.inclusionIconImage} />
                ) : (
                  <View style={styles.inclusionIcon}>
                    <Text style={styles.inclusionIconText}>•</Text>
                  </View>
                )}
                <Text style={styles.inclusionText}>{truncate(item)}</Text>
              </View>
            ))}
          </View>
          <View style={styles.inclusionCol}>
            {rightInclusions.map((item, index) => (
              <View key={`right-${index}`} style={styles.inclusionRow}>
                {findInclusionIcon(item) ? (
                  <Image src={normalizeImageSrc(findInclusionIcon(item) as string)} style={styles.inclusionIconImage} />
                ) : (
                  <View style={styles.inclusionIcon}>
                    <Text style={styles.inclusionIconText}>•</Text>
                  </View>
                )}
                <Text style={styles.inclusionText}>{truncate(item)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.totalPriceRow}>
          <Text style={styles.totalLeft}>Total Net Price</Text>
          <Text style={styles.totalRight}>{data.totalNetPrice}</Text>
        </View>

        {hasGuests ? (
          <>
            <Text style={styles.sectionHeading}>Guests Details</Text>
            <View style={styles.thinBlueRule} />
            {guests.map((guest, index) => (
              <Text key={`guest-${index}`} style={styles.guestLine}>
                {index + 1}. {guest}
              </Text>
            ))}
            {renderSegmentedRule('guest')}
          </>
        ) : null}

        {hasHotels ? (
          <>
            <Text style={styles.sectionHeading}>Hotels</Text>
            <View style={styles.thinBlueRule} />
            {hotels.map((hotel, index) => (
              <View key={`hotel-${index}`} style={styles.hotelCard}>
                <View style={styles.hotelTopRow}>
                  <View style={styles.hotelLeft}>
                    {hotel.image ? (
                      <Image src={normalizeImageSrc(hotel.image)} style={styles.hotelImage} />
                    ) : (
                      <Image src={normalizeImageSrc(hotelFallbackImage(hotel.name))} style={styles.hotelImage} />
                    )}
                    <View style={styles.hotelBody}>
                      <Text style={styles.hotelName}>{hotel.name}</Text>
                      <View style={styles.hotelStars}>
                        {Array.from({ length: Math.max(0, hotel.stars ?? 3) }).map((_, starIndex) => (
                          <Image
                            key={`hotel-${index}-star-${starIndex}`}
                            src="/image/star.png"
                            style={styles.hotelStarIcon}
                          />
                        ))}
                      </View>
                      <View style={styles.hotelCityRow}>
                        <Image src="/image/location.png" style={styles.hotelLocationIcon} />
                        <Text style={styles.hotelCity}>{hotel.city}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.hotelRight}>
                    <Text>Check in : {hotel.checkIn}</Text>
                    <Text>Check out : {hotel.checkOut}</Text>
                  </View>
                </View>
                <View style={styles.hotelMetaBlock}>
                  <Text style={styles.hotelMetaLine}>
                    <Text style={styles.hotelMeta}>Rooms & Guests - </Text>
                    <Text style={styles.hotelMetaValue}>{hotel.roomsGuests}</Text>
                  </Text>
                  <Text style={styles.hotelMetaLine}>
                    <Text style={styles.hotelMeta}>Room Type - </Text>
                    <Text style={styles.hotelMetaValue}>{hotel.roomType}</Text>
                  </Text>
                  <Text style={styles.hotelMetaLine}>
                    <Text style={styles.hotelMeta}>Meal Type - </Text>
                    <Text style={styles.hotelMetaValue}>{hotel.mealType}</Text>
                  </Text>
                </View>
              </View>
            ))}
            {renderSegmentedRule('hotels')}
          </>
        ) : null}

        {hasSightseeing ? (
          <>
            <Text style={styles.sectionHeading}>Sightseeing</Text>
            <View style={styles.thinBlueRule} />
            {sightseeing.map((item, index) => (
              <View key={`sight-${index}`} wrap={false}>
                <View
                  style={[
                    styles.sightRow,
                    ...(index === sightseeing.length - 1 ? [{ borderBottomWidth: 0 }] : []),
                  ]}
                >
                  <Text style={styles.sightText}>{item.title}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.mode}</Text>
                  </View>
                </View>
              </View>
            ))}
            {renderSegmentedRule('sightseeing')}
          </>
        ) : null}

        {hasItinerary ? (
          <>
            <Text style={styles.itineraryHeading}>Itinerary</Text>
            <View style={styles.thinBlueRule} />
            {itineraryDays.map((day, dayIndex) => (
              <View key={`day-${dayIndex}`}>
                <Text style={styles.dayHeader}>{day.dayLabel}</Text>
                {day.entries.map((entry, entryIndex) => (
                  <View key={`day-${dayIndex}-entry-${entryIndex}`}>
                    {renderEntry(entry, entryIndex, data.pickupIconUrl, data.dropIconUrl)}
                    {entryIndex < day.entries.length - 1 ? <View style={styles.dashedRule} /> : null}
                  </View>
                ))}
                {renderSegmentedRule(`itinerary-day-${dayIndex}`)}
              </View>
            ))}
          </>
        ) : null}

        <View style={styles.footerContact}>
          <Text>Share your feedback. Call us at: {data.feedbackPhone}</Text>
        </View>
        <Text style={styles.thankYouBar}>{data.thankYouText}</Text>
      </Page>
    </Document>
  );
}

export default QuotationPDF;
