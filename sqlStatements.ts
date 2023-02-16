export const createStatements = [
  `create table AA (
    rollNumber char(19) primary key not null,
    rollNumberCounty char(2) not null,
    rollNumberMunicipality char(2) not null,
    rollNumberMapArea char(2) not null,
    rollNumberMapDivision char(1) not null,
    rollNumberMapSubdivision char(3) not null,
    rollNumberParcel char(3) not null,
    rollNumberParcelSub char(2) not null,
    rollNumberPrimarySubordinate char(4) not null,
    rollNumberMunicipalityName varchar(50),
    ward char(2) not null,
    poll char(3) not null,
    pollSuffix char(1) not null,
    highSchoolCode char(2) not null,
    publicSchoolCode char(2) not null,
    separateSchoolCode char(2) not null,
    specialRateArea varchar(6) not null,
    pacCode char(3) not null,
    previousRollNumber char(19) not null,
    frenchPublicSchoolCode char(2) not null,
    frenchSeparateSchoolCode char(2) not null
  )`,
  `create table BB (
    rollNumber char(19) primary key not null,
    frontageFeet double,
    frontageMetres double,
    siteAreaSquareFeet double,
    siteAreaAcres double,
    depthFeet double,
    depthMetres double,
    farmForestryExemptionAcres double,
    siteImprovement char(2) not null,
    siteImprovementHasBoathouse bit,
    siteImprovementHasSiteImprovements bit,
    siteImprovementHasOther bit,
    siteImprovementHasAccessibleFacilities bit,
    siteImprovementHasPool bit,
    siteImprovementHasElevator bit,
    siteImprovementHasSauna bit,
    siteImprovementHasMultiple bit,
    siteImprovementHasTennisCourts bit,
    propertyCode char(3) not null,
    propertyCodeClass varchar(20),
    propertyCodeName varchar(100),
    services char(1) not null,
    servicesName varchar(20),
    access char(1) not null,
    accessName varchar(40),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table CC (
    rollNumber char(19) not null,
    sequenceNumber char(1) not null,
    characterOfConstruction char(3) not null,
    characterOfConstructionDescription text,
    characterOfConstructionFramingDescription text,
    characterOfConstructionFloorDescription text,
    characterOfConstructionRoofDescription text,
    characterOfConstructionWallsDescription text,
    quality char(4) not null,
    shape char(1) not null,
    yearBuilt char(4) not null,
    yearBuiltCode char(1) not null,
    yearBuiltCodeName varchar(40),
    condition char(1) not null,
    conditionName varchar(10),
    conditionRakingOutOf5 tinyint,
    fullStoreys char(2) not null,
    partStoreys char(1) not null,
    partStoreysName varchar(20),
    heightEffectiveYearBuilt char(4) not null,
    heightFeet double,
    effectiveYearBuilt integer,
    split char(1) not null,
    splitName varchar(40),
    grossArea char(6) not null,
    grossAreaSquareFeet double,
    totalBasementArea char(4) not null,
    totalBasementAreaSquareFeet double,
    finishedBasementArea char(4) not null,
    finishedBasementAreaSquareFeet double,
    basementFinish char(1) not null,
    basementFinishName varchar(20),
    fullBaths char(1) not null,
    halfBaths char(1) not null,
    numberOfBedrooms char(2) not null,
    numberOfFireplaces char(1) not null,
    heatingType char(2) not null,
    heatingTypeName varchar(30),
    airConditioning char(1) not null,
    garageType char(1) not null,
    garageTypeName varchar(40),
    garageSpaces char(3) not null,
    structureCode char(3) not null,
    structureCodeClass varchar(20),
    structureCodeName varchar(100),
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table DD (
    rollNumber char(19) not null,
    sequenceNumber char(1) not null,
    acres char(9) not null,
    texture char(1) not null,
    textureName varchar(20),
    soilClass char(1) not null,
    soilClassPointsRemainingMin tinyint,
    soilClassPointsRemainingMax tinyint,
    climaticZone char(1) not null,
    woodedAcreage char(9) not null,
    orchardAcreage char(9) not null,
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table GG (
    rollNumber char(19) not null,
    sequenceNumber char(3) not null,
    name char(28) not null,
    identifier char(1) not null,
    identifierName varchar(60),
    occupancyStatus char(1) not null,
    occupancyStatusName varchar(80),
    religion char(1) not null,
    schoolSupport char(1) not null,
    schoolSupportName varchar(30),
    residencyCode char(1) not null,
    residencyCodeDescription varchar(100),
    citizenship char(1) not null,
    designatedRatepayerCode char(1) not null,
    yearOfBirth char(4) not null,
    monthOfBirth char(2) not null,
    frenchLanguageEducationRights char(1) not null,
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table HH (
    rollNumber char(19) not null,
    sequenceNumber char(1) not null,
    mailingAddress char(28) not null,
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table JJ (
    rollNumber char(19) primary key not null,
    cityProvinceCountry char(21) not null,
    postalCode char(7) not null,
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table KK (
    rollNumber char(19) primary key not null,
    streetNumber char(5) not null,
    upperStreetNumber char(5) not null,
    qualifier char(1) not null,
    streetName char(17) not null,
    unitNumber char(5) not null,
    civicAddress varchar(40),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table LL (
    rollNumber char(19) not null,
    sequenceNumber char(1) not null,
    legalDescription char(28) not null,
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table MM (
    rollNumber char(19) not null,
    sequenceNumber char(1) not null,
    commentsSiteDimensions char(28) not null,
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table PA (
    rollNumber char(19) not null,
    sequenceNumber char(1) not null,
    phaseInValueDollars integer not null,
    unitClass char(3) not null,
    unitClassDescription text,
    realtyTaxClass char(1) not null,
    realtyTaxClassName varchar(100),
    realtyTaxQualifier char(1) not null,
    realtyTaxQualifierClass varchar(20),
    realtyTaxQualifierName varchar(100),
    tenantTaxLiability char(1) not null,
    noticeIssued char(1) not null,
    previousYearAssessmentDollars integer not null,
    unitSupport char(1) not null,
    unitSupportName varchar(30),
    pooledTaxesUnit char(1) not null,
    propertyType char(1) not null,
    propertyTypeName varchar(30),
    propertyTotalDollars integer not null,
    realtyPortionTotalDollars integer not null,
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table PB (
    rollNumber char(19) not null,
    sequenceNumber char(1) not null,
    realtyPortionEnglishPublicDollars integer not null,
    realtyPortionEnglishSeparateDollars integer not null,
    realtyPortionNoSupportDollars integer not null,
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table PC (
    rollNumber char(19) not null,
    sequenceNumber char(1) not null,
    realtyPortionFrenchPublicDollars integer not null,
    realtyPortionFrenchSeparateDollars integer not null,
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table PD (
    rollNumber char(19) not null,
    sequenceNumber char(1) not null,
    realtyPortionProtestantSeparateDollars integer not null,
    primary key (rollNumber, sequenceNumber),
    foreign key (rollNumber) references AA (rollNumber)
  )`,
  `create table PI (
    rollNumber char(19) primary key not null,
    phaseInStartingPointDollars integer not null,
    phaseInValueDollars integer not null,
    phaseInDestinationValueDollars integer not null,
    foreign key (rollNumber) references AA (rollNumber)
  )`,

  `create view HH_Flattened as
    select rollNumber,
    max(case when sequenceNumber = '1' then mailingAddress else '' end) as mailingAddress1,
    max(case when sequenceNumber = '2' then mailingAddress else '' end) as mailingAddress2,
    max(case when sequenceNumber = '3' then mailingAddress else '' end) as mailingAddress3
    from HH
    group by rollNumber`,

  `create view LL_Flattened as
    select rollNumber,
    max(case when sequenceNumber = '1' then legalDescription else '' end) as legalDescription1,
    max(case when sequenceNumber = '2' then legalDescription else '' end) as legalDescription2,
    max(case when sequenceNumber = '3' then legalDescription else '' end) as legalDescription3,
    max(case when sequenceNumber = '4' then legalDescription else '' end) as legalDescription4,
    max(case when sequenceNumber = '5' then legalDescription else '' end) as legalDescription5
    from LL
    group by rollNumber`,

  `create view MM_Flattened as
    select rollNumber,
    max(case when sequenceNumber = '1' then commentsSiteDimensions else '' end) as commentsSiteDimensions1,
    max(case when sequenceNumber = '2' then commentsSiteDimensions else '' end) as commentsSiteDimensions2,
    max(case when sequenceNumber = '3' then commentsSiteDimensions else '' end) as commentsSiteDimensions3,
    max(case when sequenceNumber = '4' then commentsSiteDimensions else '' end) as commentsSiteDimensions4,
    max(case when sequenceNumber = '5' then commentsSiteDimensions else '' end) as commentsSiteDimensions5
    from MM
    group by rollNumber`,

  `create view PropertyData as
    select AA.rollNumber, KK.civicAddress,
    AA.rollNumberCounty, AA.rollNumberMunicipality, AA.rollNumberMapArea, AA.rollNumberMapDivision, AA.rollNumberMapSubdivision, AA.rollNumberParcel, AA.rollNumberParcelSub, AA.rollNumberPrimarySubordinate,
    AA.rollNumberMunicipalityName,
    AA.ward, AA.poll, AA.pollSuffix,
    AA.highSchoolCode, AA.publicSchoolCode, AA.separateSchoolCode, AA.frenchPublicSchoolCode, AA.frenchSeparateSchoolCode,
    AA.specialRateArea, AA.pacCode, AA.previousRollNumber,
    BB.frontageFeet, BB.frontageMetres,
    BB.siteAreaSquareFeet, BB.siteAreaAcres,
    BB.depthFeet, BB.depthMetres,
    BB.farmForestryExemptionAcres,
    BB.siteImprovement,
    BB.siteImprovementHasBoathouse, BB.siteImprovementHasSiteImprovements, BB.siteImprovementHasOther, BB.siteImprovementHasAccessibleFacilities, BB.siteImprovementHasPool,
    BB.siteImprovementHasElevator, BB.siteImprovementHasSauna, BB.siteImprovementHasMultiple, BB.siteImprovementHasTennisCourts,
    BB.propertyCode, BB.propertyCodeClass, BB.propertyCodeName,
    BB.services, BB.servicesName,
    BB.access, BB.accessName
    from AA
    left join BB on AA.rollNumber = BB.rollNumber
    left join KK on AA.rollNumber = KK.rollNumber`,

  `create view NamesAndAddresses as
    select
    GG.rollNumber, GG.sequenceNumber,
    GG.name, GG.identifier, GG.identifierName,
    GG.occupancyStatus, GG.occupancyStatusName,
    GG.religion, GG.schoolSupport, GG.schoolSupportName,
    GG.residencyCode, GG.residencyCodeDescription,
    GG.citizenship, GG.designatedRatepayerCode,
    GG.yearOfBirth, GG.monthOfBirth, GG.frenchLanguageEducationRights,
    HH.mailingAddress1, HH.mailingAddress2, HH.mailingAddress3,
    JJ.cityProvinceCountry, JJ.postalCode
    from GG
    left join HH_Flattened HH on GG.rollNumber = HH.rollNumber
    left join JJ on HH.rollNumber = JJ.rollNumber`,

  `create view PropertyLocations as
    select
    KK.rollNumber,
    KK.streetNumber, KK.upperStreetNumber, KK.qualifier, KK.streetName, KK.unitNumber, KK.civicAddress,
    LL.legalDescription1, LL.legalDescription2, LL.legalDescription3, LL.legalDescription4, LL.legalDescription5,
    MM.commentsSiteDimensions1, MM.commentsSiteDimensions2, MM.commentsSiteDimensions3, MM.commentsSiteDimensions4, MM.commentsSiteDimensions5
    from KK
    left join LL_Flattened LL on KK.rollNumber = LL.rollNumber
    left join MM_Flattened MM on KK.rollNumber = MM.rollNumber`,

  `create view ValuationTaxLiability as
    select PA.rollNumber, KK.civicAddress, PA.sequenceNumber,
    PA.unitClass, PA.unitClassDescription,
    PA.realtyTaxClass, PA.realtyTaxClassName,
    PA.realtyTaxQualifier, PA.realtyTaxQualifierClass, PA.realtyTaxQualifierName,
    PA.tenantTaxLiability, PA.noticeIssued, PA.previousYearAssessmentDollars,
    PA.unitSupport, PA.unitSupportName,
    PA.pooledTaxesUnit, PA.propertyType, PA.propertyTypeName,
    PA.propertyTotalDollars, PA.realtyPortionTotalDollars,
    PB.realtyPortionEnglishPublicDollars, PB.realtyPortionEnglishSeparateDollars,
    PC.realtyPortionFrenchPublicDollars, PC.realtyPortionFrenchSeparateDollars,
    PD.realtyPortionProtestantSeparateDollars,
    PI.phaseInStartingPointDollars, PI.phaseInValueDollars, PI.phaseInDestinationValueDollars
    from PA
    left join PB on PA.rollNumber = PB.rollNumber and PA.sequenceNumber = PB.sequenceNumber
    left join PC on PA.rollNumber = PC.rollNumber and PA.sequenceNumber = PC.sequenceNumber
    left join PD on PA.rollNumber = PD.rollNumber and PA.sequenceNumber = PD.sequenceNumber
    left join PI on PA.rollNumber = PI.rollNumber
    left join KK on PA.rollNumber = KK.rollNumber`
]
