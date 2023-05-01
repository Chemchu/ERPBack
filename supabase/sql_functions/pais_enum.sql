CREATE TYPE pais AS ENUM 
    (
    'China', 'India', 'United States', 'Indonesia', 'Pakistan', 'Brazil', 'Nigeria', 'Bangladesh', 'Russia', 'Mexico',
    'Japan', 'Ethiopia', 'Philippines', 'Egypt', 'Vietnam', 'DR Congo', 'Turkey', 'Iran', 'Germany', 'Thailand',
    'United Kingdom', 'France', 'Italy', 'Tanzania', 'South Africa', 'Myanmar', 'Kenya', 'South Korea', 'Colombia', 'Spain',
    'Uganda', 'Argentina', 'Algeria', 'Sudan', 'Ukraine', 'Iraq', 'Afghanistan', 'Poland', 'Canada', 'Morocco',
    'Uzbekistan', 'Saudi Arabia', 'Malaysia', 'Peru', 'Venezuela', 'Nepal', 'Mozambique', 'Ghana', 'Yemen',
    'Madagascar', 'North Korea', 'Australia', 'Cameroon', 'Taiwan', 'Ivory Coast', 'Niger', 'Sri Lanka', 'Burkina Faso', 'Mali',
    'Romania', 'Malawi', 'Syria', 'Kazakhstan', 'Zambia', 'Netherlands', 'Chile', 'Guatemala', 'Ecuador', 'Zimbabwe',
    'Senegal', 'Cambodia', 'Chad', 'Somalia', 'Guinea', 'Rwanda', 'Benin', 'Tunisia', 'Burundi', 'Belgium',
    'Haiti', 'Cuba', 'South Sudan', 'Dominican Republic', 'Czech Republic', 'Greece', 'Jordan', 'Portugal', 'Azerbaijan', 'Sweden',
    'United Arab Emirates', 'Hungary', 'Tajikistan', 'Belarus', 'Honduras', 'Austria', 'Switzerland', 'Israel', 'Papua New Guinea', 'Togo',
    'Sierra Leone', 'Hong Kong', 'Laos', 'Paraguay', 'Bulgaria', 'Serbia', 'Lebanon', 'Libya', 'Nicaragua', 'El Salvador',
    'Kyrgyzstan', 'Turkmenistan', 'Singapore', 'Denmark', 'Finland', 'Congo', 'Slovakia', 'Norway', 'Oman', 'State of Palestine', 'Costa Rica',
    'Liberia', 'Ireland', 'Central African Republic', 'New Zealand', 'Mauritania', 'Panama', 'Kuwait', 'Croatia', 'Moldova', 'Georgia',
    'Eritrea', 'Uruguay', 'Bosnia and Herzegovina', 'Mongolia', 'Armenia', 'Jamaica', 'Qatar', 'Albania', 'Puerto Rico', 'Lithuania',
    'Namibia', 'Gambia', 'Botswana', 'Gabon', 'Lesotho', 'North Macedonia', 'Slovenia', 'Guinea-Bissau', 'Latvia', 'Bahrain',
    'Trinidad and Tobago', 'Equatorial Guinea', 'Estonia', 'Timor-Leste', 'Mauritius', 'Cyprus', 'Eswatini', 'Djibouti', 'Fiji'
    );

CREATE FUNCTION get_pais_enum_values()
  RETURNS SETOF pais
AS $$
BEGIN
  RETURN QUERY SELECT unnest(enum_range(NULL::pais));
END;
$$ LANGUAGE plpgsql;