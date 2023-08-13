using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core.CustomDataAnnotations
{
    public class GraterThanZero : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null)
                return false;

            if (value is decimal decimalValue)
            {
                return decimalValue > 0;
            }

            if (value is double doubleValue)
            {
                return doubleValue > 0;
            }

            if (value is float floatValue)
            {
                return floatValue > 0;
            }

            if (value is int intValue)
            {
                return intValue > 0;
            }

            return false;
        }
    }
}