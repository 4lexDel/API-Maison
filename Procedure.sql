CREATE PROCEDURE IncrementHouseScoreWithDecrement(@idProof INT, @deleteProof BIT)
AS
BEGIN
    DECLARE @amount INT, @idHouse INT, @passed INT, @idChallenge INT;
    
    -- Récupérer l'amount, l'idHouse, la valeur passed et l'idChallenge correspondants à l'idProof donné
    SELECT @amount = c.amount, @idHouse = p.idHouse, @passed = c.passed, @idChallenge = c.idChallenge
    FROM proof p
    INNER JOIN challenge c ON p.idChallenge = c.idChallenge
    WHERE p.idProof = @idProof;
    
    -- Vérifier que la valeur de 'passed' est supérieure à 1
    IF @passed > 1
    BEGIN
        -- Incrémenter le score de la house avec l'amount du challenge
        UPDATE house
        SET score = score + @amount
        WHERE idHouse = @idHouse;
        
        -- Décrémenter la valeur 'passed' du challenge de 1
        UPDATE challenge
        SET passed = passed - 1
        WHERE idChallenge = @idChallenge;
        
        -- Supprimer la donnée de proof si @deleteProof est True
        IF @deleteProof = 1
        BEGIN
            DELETE FROM proof
            WHERE idProof = @idProof;
        END;
    END;
END;
