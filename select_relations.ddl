SELECT array_to_json(array_agg(row_to_json(t)))
FROM (
  SELECT P.subject, P.predicate, P.object, P.link
  FROM relations P
  INNER JOIN relation_ratings Q
  ON P.id = Q.relation_id
  WHERE Q.value = 5
) t;
